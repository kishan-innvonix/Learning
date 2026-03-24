import TodoApp from "@/components/TodoApp";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Next.js Todo App</h1>

      {/* Client Component handles everything */}
      <TodoApp />
    </main>
  );
}