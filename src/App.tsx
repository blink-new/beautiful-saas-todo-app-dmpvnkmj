
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Toaster } from "react-hot-toast"
import { Todo, useTodoStore } from "./lib/store"

export default function App() {
  const [newTodo, setNewTodo] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { todos, categories, addTodo, toggleTodo, deleteTodo } = useTodoStore()

  const filteredTodos = todos.filter((todo) =>
    selectedCategory === "All" ? true : todo.category === selectedCategory
  )

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    addTodo({
      title: newTodo,
      completed: false,
      category: selectedCategory === "All" ? "Personal" : selectedCategory,
    })
    setNewTodo("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      
      <SignedOut>
        <div className="flex min-h-screen items-center justify-center">
          <SignIn />
        </div>
      </SignedOut>

      <SignedIn>
        <div className="mx-auto max-w-4xl px-4 py-10">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-900">Tasks</h1>
            <UserButton />
          </div>

          <div className="mb-6 flex space-x-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`btn ${
                selectedCategory === "All"
                  ? "btn-primary"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn ${
                  selectedCategory === category
                    ? "btn-primary"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <form onSubmit={handleAddTodo} className="mb-6 flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="input flex-1"
            />
            <button type="submit" className="btn btn-primary">
              <Plus className="h-5 w-5" />
            </button>
          </form>

          <div className="space-y-2">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
            {filteredTodos.length === 0 && (
              <div className="rounded-lg border border-dashed border-gray-200 p-8 text-center">
                <p className="text-gray-500">No tasks yet. Add one above!</p>
              </div>
            )}
          </div>
        </div>
      </SignedIn>
    </div>
  )
}

function TodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}) {
  return (
    <div
      className={`transform rounded-lg border bg-white p-4 shadow-sm transition-all duration-200 hover:shadow ${
        todo.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span
            className={`text-gray-800 ${
              todo.completed ? "line-through opacity-50" : ""
            }`}
          >
            {todo.title}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
            {todo.category}
          </span>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-gray-400 hover:text-red-500"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}