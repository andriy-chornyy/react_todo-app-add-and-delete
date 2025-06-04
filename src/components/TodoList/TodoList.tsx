import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  allTodos: Todo[];
  tempTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({ allTodos, tempTodo }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {allTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {tempTodo && <TodoItem key={tempTodo.id} todo={tempTodo} />}
    </section>
  );
};
