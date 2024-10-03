export interface TodoSingleItem {
  id: number;
  message: string;
  completed: boolean;
}

export interface InitialStateTypes {
  todos: TodoSingleItem[];
}

export interface TodoItemProps {
  todo: TodoSingleItem;
}
