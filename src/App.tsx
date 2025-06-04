/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, addTodo, USER_ID } from './api/todos';

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

  // const [title, setTitle] = useState('');

  const [tempTodo, setTempTodo] = useState<Todo | null>(null);

  const [isError, setIsError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    getTodos()
      .then(setAllTodos)
      .catch(() => {
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 3000);
      });
  }, []);

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

  const handleAddTodo = (title: string) => {
    const newTempTodo = {
      id: 0,
      title: title,
      completed: false,
      userId: USER_ID,
    }

    setTempTodo(newTempTodo);

    addTodo(title).then(todoFromServer => {
      setTempTodo(null);
      setAllTodos(prevTodos => [...prevTodos, todoFromServer]);
      setIsError(false);
    });
  };

  const handleError = (isError: boolean) => setIsError(isError);
  console.log('errorAnswer', isError);


  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          handleAddTodo={handleAddTodo}
          handleError={handleError}
          isError={isError}
        />

        <TodoList allTodos={todosToDisplay} tempTodo={tempTodo} />

        {allTodos.length > 0 && (
          <Footer
            allTodos={allTodos}
            selectedValue={(value: string) => setSelectedValue(value)}
            onSelect={selectedValue}
          />
        )}
      </div>

      <ErrorNotification isError={isError} />
    </div>
  );
};
