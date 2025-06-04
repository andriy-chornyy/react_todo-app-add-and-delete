import React, { useRef, useEffect, useState } from 'react';

type Props = {
  handleAddTodo: (title: string) => void;
  handleError: (errorAnswer: boolean) => void;
  isError: boolean;
};

export const Header: React.FC<Props> = ({ handleAddTodo, handleError, isError}) => {
  const titleField = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim().length === 0) {
      handleError(true);
      return;
    }

    const normalizedTitle = title.trim();

    handleAddTodo(normalizedTitle);

    // if (isError !== true) {
    //   setTitle('')
    // }
    if (normalizedTitle) {
      setTitle('')
      handleError(false)
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={titleField}
          value={title}
          onChange={event => {
            setTitle(event.target.value)
          }}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
