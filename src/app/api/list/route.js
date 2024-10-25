import connectMongoDB from "@/lib/connectMongoDB";
import { ObjectId } from "mongodb";

const db = await connectMongoDB();

// const getTodos = async () => {
//   try {
//     const todosCollection = db.collection("todo-collections");
//     return await todosCollection.find({}, { projection: {} }).toArray();
//   } catch (error) {
//     console.log("Error fetching todos:", error);
//   }
// };

const getTodos = async () => {
  try {
    const todosCollection = db.collection("todo-collections");

    // Fetch and sort todos by the `createdAt` field in descending order (-1)
    return await todosCollection.find({}).sort({ createdAt: -1 }).toArray();
  } catch (error) {
    console.log("Error fetching todos:", error);
  }
};

// const insertTodo = async (todo) => {
//   const todosCollection = db.collection("todo-collections");
//   return await todosCollection.insertOne(todo);
// };

const insertTodo = async (todo) => {
  const todosCollection = db.collection("todo-collections");
  const todoWithTimestamp = {
    ...todo,
    createdAt: new Date(), // Add a timestamp when the todo is created
  };
  return await todosCollection.insertOne(todoWithTimestamp);
};

const deleteTodo = async (id) => {
  const todosCollection = db.collection("todo-collections");
  const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });
  return result;
};

// New update function to modify a todo by ID
const updateTodo = async (id, updatedFields) => {
  const todosCollection = db.collection("todo-collections");
  const result = await todosCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedFields }
  );
  return result;
};

export async function GET(req) {
  const todos = await getTodos();
  return new Response(JSON.stringify(todos), { status: 200 });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await insertTodo(body);
    return new Response(JSON.stringify({ message: "Todo inserted", result }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to insert todo" }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const result = await deleteTodo(id);
    if (result.deletedCount === 1) {
      return new Response(JSON.stringify({ message: "Deleted successfully" }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Todo not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.log("Error deleting Todo", error);
    return new Response(JSON.stringify({ message: "Failed to delete Todo" }), {
      status: 500,
    });
  }
}

// PUT method to update a todo by ID
export async function PUT(req) {
  try {
    const { id, updatedFields } = await req.json();
    const result = await updateTodo(id, updatedFields);
    if (result.modifiedCount === 1) {
      return new Response(JSON.stringify({ message: "Updated successfully" }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Todo not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.log("Error updating Todo", error);
    return new Response(JSON.stringify({ message: "Failed to update Todo" }), {
      status: 500,
    });
  }
}
