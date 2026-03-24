"use client";

import { useState } from "react";

export default function TodoForm({ onAdd }: any) {
  const [text, setText] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!text) return;

    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    setText("");
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="border p-2 flex-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo..."
      />
      <button className="bg-blue-500 text-white px-4">Add</button>
    </form>
  );
}