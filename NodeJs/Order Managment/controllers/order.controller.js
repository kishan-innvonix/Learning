import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as idv4 } from "uuid";
import { asyncHandler, BadRequestError, NotFoundError } from "../utils/asyncHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ordersPath = path.join(__dirname, "..", "data", "orders.json");

const readData = () => {
  return JSON.parse(fs.readFileSync(ordersPath, "utf-8"));
};

const writeData = (data) => {
  fs.writeFileSync(ordersPath, JSON.stringify(data), (err) => {
    throw Error("Error while saving order!");
  });
};

export const createOrder = asyncHandler(async (req, res) => {
    const { items } = req.body;

    const order = {
      id: idv4(),
      items,
      status: "PENDING",
      createdAt: new Date(),
    };

    const data = readData();

    data.push(order);

    writeData(data);

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order,
    });
});

export const getOrders = asyncHandler(async (req, res) => {
    const orders = readData();

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      orders,
    });
});

export const getOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const orders = readData();

    const order = orders.find((order) => order.id == id);

    if (!order) {
        throw new NotFoundError("Order not found!!!");
    }

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      order,
    });
});

export const cancelOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const orders = readData();

    const order = orders.find((order) => order.id == id);

    if (!order) {
        throw new NotFoundError("Order not found!!!");
    }

    if (order.status !== "PENDING") {
        const message = order.status === "DISPATCH"
            ? "Order not cancel once it out for delivery"
            : order.status === "DELIVERED"
              ? "Order not cancel once delivered!!!"
              : "Order already canceled"
        throw new BadRequestError(message)
    }

    const updatedOrders = orders.map((order) => {
      if (order?.id == id) {
        order.status = "CANCELED";
      }
      return order;
    });

    writeData(updatedOrders);

    res.status(200).json({
      success: true,
      message: "Order Canceled Successfully",
    });
});

export const updateOrder = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const orders = readData();

  const order = orders.find((order) => order.id == id);

  if (!order) {
    throw new NotFoundError("Order not found")
  }

  if (order.status === "CANCELED") {
    throw new BadRequestError("Invalid Status!!!")
  }

  if (order.status === "DELIVERED") {
    throw new BadRequestError("Order already delivered!!!")
  }

  const updatedOrders = orders.map((order) => {
    if (order?.id == id) {
      order.status = status;
    }
    return order;
  });

  writeData(updatedOrders);

  res.status(200).json({
    success: true,
    message: "Order Updated Successfully!",
  });
});

export const deleteOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const orders = readData();

    const order = orders.find((order) => order.id == id);

    if (!order) {
        throw  new NotFoundError("Order not found!!!");
    }

    if (order.status === "PENDING" || order.status === "DISPATCH") {
        throw new BadRequestError("Order still open!!!");
    }

    const updatedOrders = orders.filter((order) => order.id !== id);

    writeData(updatedOrders);

    res.status(200).json({
      success: true,
      message: "Order Deleted Successfully",
    });
});
