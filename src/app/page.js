export default async function Home() {
  const res = await fetch("http://localhost:3000/api/list");
  // console.log(res.json());

  return (
    <>
      <h1>usama</h1>
    </>
  );
}
