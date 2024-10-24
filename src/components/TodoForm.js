"use client";
import { useEffect, useState } from "react";
import TodoList from "./TodoList";

export default function TodoForm({ onTodoAdded }) {
  const [todos, setTodos] = useState([]);
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
    } else {
      console.error("Failed to insert todo:", responseBody);
    }
    console.log(handleSubmit);
  };
  return (
    <div className="bg-orange-400 border border-orange-800 p-4">
      <h1 className="text-2xl ">Todo Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="m-2 flex flex-row items-center justify-between  ">
          <label>Title : </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="m-2 flex flex-row items-center justify-between">
          <label>description : </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="m-2 flex flex-row items-center justify-between">
          <label>price : </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button className="bg-green-400 p-2 w-full" type="submit">
          Add Todo
        </button>
      </form>
      {message && <h1 className="text-2xl ">{message}</h1>}
      {message && <TodoList todos={todos} onTodoDeleted={fetchTodos} />}
    </div>
  );
}
