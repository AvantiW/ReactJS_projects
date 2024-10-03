import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../features/todo/todoSlice";
import { TodoSingleItem } from "../../../types";

const TodoForm = () => {
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() === "") return;

    const newTodo: TodoSingleItem = {
      id: Date.now(),
      message,
      completed: false,
    };

    dispatch(addTodo(newTodo));
    setMessage("");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 p-4 bg-gray-100 rounded-lg shadow-md"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a new task"
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
