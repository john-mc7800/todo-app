"use client";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div>
      <div className="bg-[#0a192f] p-4 border border-gray-700 text-white flex flex-col md:flex-row justify-normal md:justify-between md:items-center">
        <h1 className="text-3xl font-semibold">Todo List</h1>
        <div className="flex flex-col md:flex-row  md:space-x-4">
          <Link
            href="/todo-list"
            className="my-2 md:my-0 p-2 bg-white text-black"
          >
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
