import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black text-white">
      <h1 className="text-2xl  font-black">Welcome to Expense Tracker </h1>
      <p>Easily Manage Your Expense</p>
      <Link href={'/dashboard'} className="bg-blue-500 p-3 px-3 rounded text-black mt-4">Explore</Link>
    </div>
  );
}
