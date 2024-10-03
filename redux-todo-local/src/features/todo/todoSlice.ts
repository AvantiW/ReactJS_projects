import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateTypes, TodoSingleItem } from "../../../types";

// Load todos from localStorage if available
const loadFromLocalStorage = (): TodoSingleItem[] => {
  try {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
  } catch (error) {
    console.error("Could not load todos from localStorage", error);
  }
  return [];
};

// Save the todos to localStorage
const saveToLocalStorage = (todos: TodoSingleItem[]) => {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error("Could not save todos to localStorage", error);
  }
};

const initialState: InitialStateTypes = {
  todos: loadFromLocalStorage(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Add a new todo
    addTodo: (state, action: PayloadAction<TodoSingleItem>) => {
      state.todos.push(action.payload);
      saveToLocalStorage(state.todos);
    },
    //delete todo
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveToLocalStorage(state.todos);
    },
    // Update an existing todo
    updateTodo: (
      state,
      action: PayloadAction<{ id: number; message: string; completed: boolean }>
    ) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...action.payload };
        saveToLocalStorage(state.todos);
      }
    },
    //toggle Todo
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveToLocalStorage(state.todos);
      }
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, toggleTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
