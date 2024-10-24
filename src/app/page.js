import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div>
        <h1>Welcome to the Todo App</h1>
        <Link href="/TodoList">View Todo List</Link>{" "}
      </div>
    </>
  );
}
