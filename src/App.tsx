/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';

import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification } from './components/ErrorNotification';

import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [todosToDisplay, setTodosToDisplay] = useState<Todo[]>([]);
  const [selectedValue, setSelectedValue] = useState('All');
  const [isError, setIsError] = useState(false);
  // const [deleteId , setDeleteId ] = useState<number | null>(null);
  const [typeOfError, setTypeOfError] = useState('');

  const [imputTitle, setInputTitle] = useState('');

  useEffect(() => {
    client
      .get<Todo[]>('/todos?userId=2999')
      .then(setAllTodos)
      .catch(() => {
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 3000);
      });
  }, []);

  const handleDelete = (id: number) => {
    setAllTodos(todos => todos.filter(todo => todo.id !== id));

    client.delete(`/todos/${id}`);
  };

  const handleTitleChange = (value: string) => {
    setInputTitle(value);
    console.log('value? value value', value);

    if (value.trim() === '') {
      setTypeOfError('empty Title');
    }
  };

  const handleAddTodo = ({ title, userId, completed }: Omit<Todo, 'id'>) => {
    const maxId = Math.max(0, ...allTodos.map(todo => todo.id));
    const id = maxId + 1;

    client
      .post<Todo>('/todos', { title, userId, completed, id })
      .then(newTodo => {
        setAllTodos(current => [...current, newTodo]);
        // setTodosToDisplay(current => [...current, newTodo]); .//////?????
      });
  };


  useEffect(() => {
    let viewList = allTodos;

    if (selectedValue === 'Active') {
      viewList = viewList.filter(todo => todo.completed === false);
    }

    if (selectedValue === 'Completed') {
      viewList = viewList.filter(todo => todo.completed === true);
    }

    setTodosToDisplay(viewList);
  }, [selectedValue, allTodos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header onAddTodo={handleAddTodo} />

        <TodoList allTodos={todosToDisplay} onDelete={handleDelete} />

        {allTodos.length > 0 && (
          <Footer
            allTodos={allTodos}
            selectedValue={(value: string) => setSelectedValue(value)}
            onSelect={selectedValue}
          />
        )}
      </div>

      <ErrorNotification isError={isError} typeOfError={typeOfError} />
    </div>
  );
};
