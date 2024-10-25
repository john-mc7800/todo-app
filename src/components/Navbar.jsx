"use client";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div>
      <div className="bg-[#0a192f] p-4 border border-gray-700 text-white flex flex-row justify-between items-center">
        <h1 className="text-3xl font-semibold">Todo List</h1>
        <div className="space-x-4">
          <Link href="/todo-list" className="p-2 bg-white text-black">
            View List
          </Link>
          <Link href="/todo-form" className="p-2 bg-white text-black">
            Add Todo
          </Link>
        </div>
      </div>
    </div>
  );
}
