import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div>
        <h1>Welcome to the Todo App</h1>
        <div className=" w-[30vw] m-4 bg-blue-400">
          <Link href="/TodoList">View Todo List</Link>
        </div>
        <div className=" w-[30vw] m-4 bg-orange-400">
          <Link href="/TodoForm">Add Todos</Link>
        </div>
      </div>
    </>
  );
}
