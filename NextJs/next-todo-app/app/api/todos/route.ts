import { NextResponse } from "next/server";
import { getTodos, addTodo, toggleTodo, deleteTodo } from "@/lib/store";

// GET → fetch todos
export async function GET() {
  return NextResponse.json(getTodos());
}

// POST → add todo
export async function POST(req: Request) {
  const { text } = await req.json();
  const todo = addTodo(text);
  return NextResponse.json(todo);
}

// PUT → toggle
export async function PUT(req: Request) {
  const { id } = await req.json();
  toggleTodo(id);
  return NextResponse.json({ success: true });
}

// DELETE → remove
export async function DELETE(req: Request) {
  const { id } = await req.json();
  deleteTodo(id);
  return NextResponse.json({ success: true });
}