"use client";
import TodoList from "@/components/TodoList";
import React, { useEffect, useState } from "react";

export default function TodoListComponent() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await fetch("/api/list");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="">
      <TodoList
        todos={todos}
        onTodoDeleted={fetchTodos}
        onTodoUpdated={fetchTodos}
      />
    </div>
  );
}
