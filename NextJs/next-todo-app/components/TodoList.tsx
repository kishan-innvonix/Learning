"use client";

export default function TodoList({ todos, refresh }: any) {
  const toggle = async (id: string) => {
    await fetch("/api/todos", {
      method: "PUT",
      body: JSON.stringify({ id }),
    });
    refresh();
  };

  const remove = async (id: string) => {
    await fetch("/api/todos", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    refresh();
  };

  return (
    <ul className="mt-4 space-y-2">
      {todos.map((t: any) => (
        <li key={t.id} className="flex justify-between border p-2">
          <span
            onClick={() => toggle(t.id)}
            className={t.completed ? "line-through cursor-pointer" : "cursor-pointer"}
          >
            {t.text}
          </span>
          <button onClick={() => remove(t.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}