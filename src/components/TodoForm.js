"use client";
import { useEffect, useState } from "react";
import TodoListComponent from "./TodoListComponent";

export default function TodoForm({ onTodoAdded }) {
  const [todos, setTodos] = useState([]);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const fetchTodos = async () => {
    const res = await fetch("/api/list");
    const data = await res.json();
    setTodos(data);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the new todo to the API
    const res = await fetch("/api/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, price }),
    });

    // Log the response for debugging
    const responseBody = await res.json(); // Parse the response body
    console.log("Response status:", res.status);
    console.log("Response body:", responseBody);

    if (res.ok) {
      setTitle("");
      setDescription("");
      setPrice("");
      setMessage("Todo added successfully!");
      onTodoAdded(); // Refresh the todo list after insertion
      setTimeout(() => {
        setIsRedirecting(true);
      }, 2000);
    } else {
      console.error("Failed to insert todo:", responseBody);
    }
  };
  if (isRedirecting) {
    return <TodoListComponent />;
  }

  return (
    <div className=" border border-gray-400 p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="m-2 flex flex-row items-center justify-between  ">
          <label className="text-xl">Title : </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-[80%] border border-gray-800 focus:border-2 focus:rounded-md py-1"
          />
        </div>
        <div className="m-2 flex flex-row items-center justify-between">
          <label className="text-xl">Description : </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-[80%] border border-gray-800 focus:border-2 focus:rounded-md py-1"
          />
        </div>
        <div className="m-2 flex flex-row items-center justify-between">
          <label className="text-xl">Price : </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-[80%] border border-gray-800 focus:border-2 focus:rounded-md py-1"
          />
        </div>
        <button
          className="bg-[#0a192f] text-white text-xl p-2 w-full"
          type="submit"
        >
          Add Todo
        </button>
      </form>
      {message && <h1 className="text-2xl ">{message}</h1>}
    </div>
  );
}
