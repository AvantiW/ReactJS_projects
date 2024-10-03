import { useDispatch } from "react-redux";
import { TodoSingleItem } from "../../../types";
import {
  deleteTodo,
  toggleTodo,
  updateTodo,
} from "../../features/todo/todoSlice";
import { useState } from "react";

interface TodoItemProps {
  todo: TodoSingleItem;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>(todo.message);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (newMessage.trim() !== "") {
      dispatch(
        updateTodo({
          id: todo.id,
          message: newMessage,
          completed: todo.completed,
        })
      );
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="mr-4"
        />

        {isEditing ? (
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="p-1 border-b-2 border-gray-300 focus:outline-none"
          />
        ) : (
          <span
            className={`${
              todo.completed ? "line-through text-gray-400" : "text-black"
            }`}
          >
            {todo.message}
          </span>
        )}
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Edit
          </button>
        )}

        <button
          onClick={handleDelete}
          className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
