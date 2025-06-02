import React, { useEffect, useRef } from 'react';

type Props = {
  onAddTodo: (title: string) => void;
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {
  const titleField = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (titleField.current) {
      titleField.current.focus();

      const title = titleField.current.value;

      onAddTodo(title);
    }
  }

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
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
