"use client";
import { useEffect, useState } from "react";
import { IoIosCreate, IoIosTrash } from "react-icons/io";

export default function TodoList({ todos, onTodoDeleted, onTodoUpdated }) {
  const [loading, setLoading] = useState(true);
  const [editTodoId, setEditTodoId] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});

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

  const handleUpdate = async (id) => {
    const res = await fetch("/api/list", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, updatedFields }),
    });
    if (res.ok) {
      setEditTodoId(null);
      console.log("updated Fields");

      onTodoUpdated();
    } else {
      console.log("Failed to update todo");
    }
  };

  return (
    <div>
      {/* <h1 className="text-2xl">Todo List</h1> */}
      {todos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex flex-row justify-between items-center my-2 border border-gray-400 p-2"
            >
              {editTodoId === todo._id ? (
                <div>
                  <div className="">
                    <label className="text-2xl pr-2 font-medium">Title :</label>
                    <input
                      type="text"
                      placeholder="Title"
                      defaultValue={todo.title}
                      onChange={(e) =>
                        setUpdatedFields({
                          ...updatedFields,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Description"
                    defaultValue={todo.description}
                    onChange={(e) =>
                      setUpdatedFields({
                        ...updatedFields,
                        description: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    defaultValue={todo.price}
                    onChange={(e) =>
                      setUpdatedFields({
                        ...updatedFields,
                        price: e.target.value,
                      })
                    }
                  />
                  <button onClick={() => handleUpdate(todo._id)}>Save</button>
                </div>
              ) : (
                <div className="max-w-[60%]">
                  <div className="flex flex-row items-center  ">
                    <label className="text-2xl pr-2 font-medium">Title :</label>
                    <p className="text-xl ">{todo.title}</p>
                  </div>
                  <div className="flex flex-row items-center">
                    <label className="text-2xl pr-2 font-medium">
                      Description :
                    </label>
                    <p className="text-xl ">{todo.description}</p>
                  </div>
                  <div className="flex flex-row items-center">
                    <label className="text-2xl pr-2 font-medium">Price :</label>
                    <p className="text-xl ">{todo.price}</p>
                  </div>
                </div>
              )}
              <div className="flex space-x-4 mr-2">
                <button onClick={() => setEditTodoId(todo._id)}>
                  <IoIosCreate size={30} />
                </button>
                <button onClick={() => handleDelete(todo._id)}>
                  <IoIosTrash size={30} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
