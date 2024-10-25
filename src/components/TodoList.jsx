"use client";
import { useEffect, useState } from "react";
import { IoIosCreate, IoIosTrash } from "react-icons/io";
import DeletePopup from "./DeletePopup";

export default function TodoList({ todos, onTodoDeleted, onTodoUpdated }) {
  const [loading, setLoading] = useState(true);
  const [editTodoId, setEditTodoId] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [showPopup, setShowPopup] = useState(false);

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
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
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
              className="flex flex-col lg:flex-row justify-between lg:items-center my-2  border border-gray-400 p-2 "
            >
              {editTodoId === todo._id ? (
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] justify-between items-center">
                  <div className=" grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] mb-2 lg:mb-0 gap-x-8">
                    <div className="grid grid-col-1 lg:grid-col-[1fr_1fr]">
                      <label className="text-lg lg:text-2xl pr-2 font-medium">
                        Title :
                      </label>
                      <input
                        type="text"
                        placeholder="Title"
                        className="border border-gray-800 focus:border-2 focus:rounded-md py-1 indent-2 focus:outine-gray-800 "
                        defaultValue={todo.title}
                        onChange={(e) =>
                          setUpdatedFields({
                            ...updatedFields,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-col-1 lg:grid-col-[1fr_1fr]">
                      <label className="text-lg lg:text-2xl pr-2 font-medium">
                        Description :
                      </label>
                      <input
                        type="text"
                        placeholder="Description"
                        className="border border-gray-800 focus:border-2 focus:rounded-md py-1 indent-2"
                        defaultValue={todo.description}
                        onChange={(e) =>
                          setUpdatedFields({
                            ...updatedFields,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-col-1 lg:grid-col-[1fr_1fr] ">
                      <label className="text-lg lg:text-2xl pr-2 font-medium">
                        Price :
                      </label>
                      <input
                        type="number"
                        placeholder="Price"
                        className="border border-gray-800 focus:border-2 focus:rounded-md py-1 indent-2 "
                        defaultValue={todo.price}
                        onChange={(e) =>
                          setUpdatedFields({
                            ...updatedFields,
                            price: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex  justify-center">
                    <button
                      className="bg-[#0a192f] text-white text-xs lg:text-lg px-8 py-3  lg:mr-2 lg:m-4 w-full"
                      onClick={() => handleUpdate(todo._id)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="lg:max-w-[90%] ml-2 mx-4 lg:mx-0 lg:ml-0">
                  <div className="flex flex-row  justify-between lg:justify-normal ">
                    <label className="text-lg lg:text-2xl pr-2 font-medium ">
                      Title:
                    </label>
                    <p className="text-base lg:text-lg ">{todo.title}</p>
                  </div>
                  <div className="flex flex-row  justify-between lg:justify-normal">
                    <label className="text-lg lg:text-2xl pr-2 font-medium">
                      Description:
                    </label>
                    <p className="text-base lg:text-lg">{todo.description}</p>
                  </div>
                  <div className="flex flex-row   justify-between lg:justify-normal">
                    <label className="text-lg lg:text-2xl pr-2 font-medium">
                      Price:
                    </label>
                    <p className="text-base lg:text-lg">{todo.price} Rs</p>
                  </div>
                </div>
              )}
              <div className="flex justify-evenly space-x-4 mr-2 my-2">
                <button onClick={() => handleDelete(todo._id)}>
                  <IoIosTrash size={30} className="text-red-500" />
                </button>
                <button onClick={() => setEditTodoId(todo._id)}>
                  <IoIosCreate size={30} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Popup Notification */}
      {showPopup && (
        <DeletePopup
          message="Todo deleted successfully!"
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
