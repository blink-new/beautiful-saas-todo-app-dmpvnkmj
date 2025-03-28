
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Todo {
  id: string
  title: string
  completed: boolean
  category: string
  createdAt: number
}

interface TodoState {
  todos: Todo[]
  categories: string[]
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  addCategory: (category: string) => void
  deleteCategory: (category: string) => void
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      categories: ['Personal', 'Work', 'Shopping'],
      addTodo: (todo) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              ...todo,
              id: crypto.randomUUID(),
              createdAt: Date.now(),
            },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, category],
        })),
      deleteCategory: (category) =>
        set((state) => ({
          categories: state.categories.filter((c) => c !== category),
        })),
    }),
    {
      name: 'todo-storage',
    }
  )
)