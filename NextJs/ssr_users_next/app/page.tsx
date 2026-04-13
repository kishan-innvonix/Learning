"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Home</h1>
      <Link href="/users" className="text-blue-500">
        Users Page
      </Link>
    </div>
  );
}
