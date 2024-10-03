import { useSelector } from "react-redux";
import "./App.css";
import { TodoForm, TodoItem } from "./components";
import { RootState} from "./app/store";
import { TodoSingleItem } from "../types";

function App() {
  const todos = useSelector((state: RootState) => state.todo.todos);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Eat Your Frogs : </h1>
      <TodoForm />
      {/* Render each TodoItem */}
      <div className="mt-4 space-y-2">
        {todos.map((todo: TodoSingleItem) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
}

export default App;
