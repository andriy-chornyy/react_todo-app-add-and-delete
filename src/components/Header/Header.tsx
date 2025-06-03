import React, { useRef, useEffect, useState} from 'react';

type Props = {
  handleAddTodo: (title: string) => void;
}

export const Header: React.FC<Props> = ({handleAddTodo}) => {
  const titleField = useRef<HTMLInputElement>(null);
  const [getTitle, setGetTitle] = useState('');

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus()
    }
  }, []);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   handleAddTodo(event.target.value);
  // };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGetTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleAddTodo(getTitle);
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
          onChange={handleChangeTitle}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
