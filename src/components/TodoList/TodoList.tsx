import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  allTodos: Todo[];
  onDelete: (deleteId: number) => void;
}

export const TodoList: React.FC<Props> = ({allTodos, onDelete}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {allTodos.map(todo =>
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete}/>
      )}
    </section>
  )
}

