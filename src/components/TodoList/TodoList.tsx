import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  allTodos: Todo[];
  tempTodo: Todo | null;
  handleDeleteTodo: (todoId: number) => void;
};

export const TodoList: React.FC<Props> = ({ allTodos, tempTodo, handleDeleteTodo}, ) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {allTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo} />
      ))}
      {tempTodo && <TodoItem key={tempTodo.id} todo={tempTodo} />}

    </section>
  );
};
