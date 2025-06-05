/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, addTodo, USER_ID, deleteTodo, deleteAllCompletedTodos } from './api/todos';

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
  const [deletingTodoId, setDeletingTodoId] = useState<number | null>(null);


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
      setAllTodos(prevTodos => [...prevTodos, todoFromServer]);
      setTempTodo(null);
      setIsError(false);
    });
  };

  const handleDeleteTodo = (todoId: number) => {
    setDeletingTodoId(todoId);

    deleteTodo(todoId)
      .then(() => {
        setAllTodos(allTodos => allTodos.filter(todo => todo.id !== todoId));
      })
      .finally(() => {
        setDeletingTodoId(null)
      });
  }


  const handleError = (isError: boolean) => setIsError(isError);
  console.log('errorAnswer', isError);





  const handleDeleteCompleted = async () => {
    const [completedTodos, allTodos] = await Promise.all([
      deleteAllCompletedTodos(),
      getTodos(),
    ])
    const completedIds = completedTodos.map(todo => todo.id);

    for (let id of completedIds) {
      handleDeleteTodo(id)
    }

    // setAllTodos(allTodos.filter(todo => !completedIds.includes(todo.id)));

    // console.log('completedTodos completedTodos', completedTodos, allTodos);
  };


  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          handleAddTodo={handleAddTodo}
          handleError={handleError}
          isError={isError}
        />

        <TodoList
          allTodos={todosToDisplay}
          tempTodo={tempTodo}
          handleDeleteTodo={handleDeleteTodo}
          deletingTodoId={deletingTodoId}
        />

        {allTodos.length > 0 && (
          <Footer
            allTodos={allTodos}
            selectedValue={(value: string) => setSelectedValue(value)}
            onSelect={selectedValue}
            handleDeleteCompleted={handleDeleteCompleted}
          />
        )}
      </div>

      <ErrorNotification isError={isError} />
    </div>
  );
};

// console.log('client.get<Todo[]>(`/todos?userId=${USER_ID}&completed=true`)',client.get<Todo[]>(`/todos?userId=${USER_ID}&completed=true`));
