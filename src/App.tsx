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

  // const [titleChange, setTitleChange] = useState('');

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

  const onTitleChange = (title: string) => {
    // console.log('onTitleChange called with:', title);
    if (title.trim().length === 0) {
      return;
    }

    // const maxId = Math.max(0, ...allTodos.map(todo => todo.id));

    const userId = 2999;
    let completed = false;
    // const id = maxId + 1;

    const titleTrim = title.trim();

    client
      .post<Todo>('/todos', { userId, title: titleTrim, completed})
      .then(newTodo => {
        console.log('New todo from server:', newTodo);
        setAllTodos(prev => [...prev, newTodo]);
      });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          handleAddTodo={onTitleChange}
        />

        <TodoList allTodos={todosToDisplay} />

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
