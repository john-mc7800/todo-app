"use client";
import { useEffect, useState } from "react";
import { IoIosTrash } from "react-icons/io";

export default function TodoList({ todos, onTodoDeleted }) {
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    const res = await fetch("/api/list", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      onTodoDeleted();
    } else {
      console.log("Failed to delete todo");
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [todos]);

  if (loading) {
    return <div>Loading1...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl">Todo List</h1>
      {todos.length === 0 ? (
        <p>Loading2...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex flex-row justify-between items-center m-2 bg-blue-400 border border-blue-800 p-2"
            >
              <div>
                <div className="flex flex-row items-center">
                  <label>Title:</label>
                  <h2>{todo.title}</h2>
                </div>
                <div className="flex flex-row items-center">
                  <label>Description:</label>
                  <p>{todo.description}</p>
                </div>
                <div className="flex flex-row items-center">
                  <label>Price:</label>
                  <p>{todo.price}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(todo._id)}>
                <IoIosTrash size={30} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
