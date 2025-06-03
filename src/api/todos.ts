import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2999;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodos = (title: string) => {
  return client.post<Todo>('/todos', { userId: USER_ID, title, completed: false })
};

// Add more methods here
