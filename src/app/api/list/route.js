// import { NextResponse } from "next/server";
// import connect from "@/lib/connect";

// export async function GET() {
//   await connect();

//   return NextResponse.json({ result: true });
// }

// app/api/list/route.js

import connectMongoDB from "@/lib/connectMongoDB";

const getTodos = async () => {
  try {
    const db = await connectMongoDB();
    console.log("Database connected:");
    const todosCollection = db.collection("todo-collections");

    const todos = await todosCollection.find({}, { projection: {} }).toArray();
    console.log("Fetched todos:");
    return todos;
  } catch (error) {
    console.log("Error fetching todos:", error);
  }
};

export async function GET(req) {
  const todos = await getTodos();
  return new Response(JSON.stringify(todos), { status: 200 });
}
