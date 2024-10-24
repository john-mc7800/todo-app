"use client";
import TodoForm from "@/components/TodoForm";
import React, { useState } from "react";

export default function page() {
  const [refresh, setRefresh] = useState(false);
  const handleTodoAdded = () => {
    setRefresh(!refresh);
  };
  return (
    <div className="w-[30vw] h-auto m-4 ">
      <TodoForm onTodoAdded={handleTodoAdded} />
    </div>
  );
}
