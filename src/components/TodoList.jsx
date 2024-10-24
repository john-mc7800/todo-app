"use client";
import { useEffect, useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/list");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      {todos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              <h2>{todo.title}</h2>
              <p>{todo.description}</p>
              <p>{todo.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
