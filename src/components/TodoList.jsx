"use client";
import { useEffect, useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/list"); // Fetch from your API route
        const data = await response.json();
        setTodos(data); // Update state with fetched todos
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchTodos(); // Call the fetch function
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div>
      <h1>Todo List</h1>
      {todos.length === 0 ? (
        <p>No todos available.</p> // Show message if no todos
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              <h2>{todo.title}</h2>
              <p>{todo.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
