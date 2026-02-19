import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/reducers/reducer";

const productsData = [
  { id: 1, name: "Product A", price: 20 },
  { id: 2, name: "Product B", price: 35 },
  { id: 3, name: "Product C", price: 50 },
];

export default function CartUI() {
  const cart = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
      {/* Product List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Products</h2>

        <div className="space-y-3">
          {productsData.map((p) => (
            <div
              key={p.id}
              className="border p-3 flex justify-between items-center rounded"
            >
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-gray-500">${p.price}</p>
              </div>

              <button
                onClick={() => handleAddToCart(p)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Cart</h2>

        {cart?.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          <div className="space-y-3">
            {cart?.map((item) => (
              <div
                key={item.id}
                className="border p-3 flex justify-between items-center rounded"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.qty} • ${item.price}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
