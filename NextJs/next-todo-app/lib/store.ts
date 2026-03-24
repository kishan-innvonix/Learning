import { Todo } from "@/types/todo";

let todos: Todo[] = [];

export function getTodos() {
  return todos;
}

export function addTodo(text: string) {
  const newTodo: Todo = {
    id: Date.now().toString(),
    text,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
}

export function toggleTodo(id: string) {
  todos = todos.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
}

export function deleteTodo(id: string) {
  todos = todos.filter((t) => t.id !== id);
}