"use client";
import { useState } from "react";

export default function AddTaskForm({ onAdd }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    // Prevents page refresh (default form behavior)
    e.preventDefault();

    if (!input.trim()) return; // validation

    onAdd(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-1 p-2 rounded bg-gray-800"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="bg-blue-500 px-4 rounded">
        Add
      </button>
    </form>
  );
}
