import Order from "../models/order.model.js";
import { publish } from "../../../shared/rabbitmq.js";
import axios from "axios";
import constants from "../../../shared/constants.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { userId, status } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const userResponse = await axios.get(
      `${constants.SERVICE_URLS.USERS}/users/${userId}`
    );

    if (!userResponse.data || !userResponse.data.data) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userResponse.data.data;

    const order = new Order({
      userId,
      userName: user.username || user.name,
      userEmail: user.email,
      status,
    });
    const savedOrder = await order.save();

    await publish("order.created", {
      orderId: savedOrder._id,
      userId: savedOrder.userId,
      userName: savedOrder.userName,
      userEmail: savedOrder.userEmail,
      status: savedOrder.status,
    });

    res.status(201).json(savedOrder);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) return res.status(404).json({ error: "Order not found" });

    await publish("order.updated", {
      orderId: order._id,
      userId: order.userId,
      userName: order.userName,
      userEmail: order.userEmail,
      status: order.status,
    });

    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    await publish("order.deleted", {
      orderId: order._id,
      userId: order.userId,
    });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "dispatch", "delivered"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );
    if (!order) return res.status(404).json({ error: "Order not found" });

    await publish("order.status.updated", {
      orderId: order._id,
      userId: order.userId,
      userName: order.userName,
      userEmail: order.userEmail,
      status: order.status,
    });

    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
