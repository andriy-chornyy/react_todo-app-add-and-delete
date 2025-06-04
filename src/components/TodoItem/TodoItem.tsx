/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todo: Todo;
  handleDeleteTodo: (todoId: number) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo: { title, completed, id }, handleDeleteTodo
}) => {
  console.log('idididididididididididididididid', id);

  return (
    <>
      {/* This is a completed todo */}
      <div
        data-cy="Todo"
        className={cn('todo', { completed: completed === true })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status loader"
            checked={completed}
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title ">
          {/* Completed Todo */}
          {title}
        </span>
        {/* Remove button appears only on hover */}
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() =>handleDeleteTodo(id)}
        >
          ×
        </button>

        {/* overlay will cover the todo while it is being deleted or updated */}

        {id === 0 && (
          <div data-cy="TodoLoader" className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        )}
      </div>
    </>
  );
};

// /* eslint-disable jsx-a11y/label-has-associated-control */
// /* eslint-disable jsx-a11y/control-has-associated-label */

// import React from 'react';
// import { Todo } from '../../types/Todo';
// import cn from 'classnames';

// type Props = {
//   todo: Todo;
// };

// export const TodoItem: React.FC<Props> = ({
//   todo: { title, completed, id },
// }) => {
//   return (
//     <>
//       {/* This is a completed todo */}
//       <div
//         data-cy="Todo"
//         className={cn('todo', { completed: completed === true })}
//       >
//         <label className="todo__status-label" htmlFor={`${id}`}>
//           <input
//             data-cy="TodoStatus"
//             type="checkbox"
//             className="todo__status"
//             checked={completed}
//           />
//         </label>

//         <span data-cy="TodoTitle" className="todo__title">
//           {/* Completed Todo */}
//           {title}
//         </span>

//         {/* Remove button appears only on hover */}
//         <button type="button" className="todo__remove" data-cy="TodoDelete">
//           ×
//         </button>

//         {/* overlay will cover the todo while it is being deleted or updated */}

//         <div data-cy="TodoLoader" className="modal overlay">
//           <div className="modal-background has-background-white-ter" />
//           <div className="loader" />
//         </div>
//       </div>
//     </>
//   );
// };
