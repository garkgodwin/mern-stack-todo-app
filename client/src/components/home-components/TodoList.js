import React from 'react';

import Todo from './Todo';
import Page404 from '../Page404';

const TodoList = ({ todos, setTodos, changeDisplay, setSearchValue }) => {
	if (todos === undefined || todos === null || todos.length === 0) {
		return (
			<Page404 fromTodoSearch={true} setSearchValue={setSearchValue} />
		);
	}
	return (
		<ul className="container-fluid w-100 h-100" id="todo-list-container">
			{todos.map((todo) => (
				<Todo
					key={todo._id}
					value={todo._id}
					todo={todo}
					setTodos={setTodos}
					todos={todos}
					changeDisplay={changeDisplay}
				/>
			))}
		</ul>
	);
};

export default TodoList;
