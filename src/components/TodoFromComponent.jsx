"use client";
import TodoForm from "@/components/TodoForm";
import React, { useState } from "react";

export default function TodoFromComponent() {
  const [refresh, setRefresh] = useState(false);
  const handleTodoAdded = () => {
    setRefresh(!refresh);
  };
  return (
    <div className="mt-2">
      <TodoForm onTodoAdded={handleTodoAdded} />
    </div>
  );
}
