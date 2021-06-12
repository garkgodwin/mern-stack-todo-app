import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Todo from './Todo';
import Page404 from '../Page404';

const TodoList = ({ todos, setTodos, changeDisplay }) => {
	const [dateTime, setDateTime] = useState(new Date());
	if (todos === undefined || todos === null || todos.length === 0) {
		return <Page404 />;
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
					dateTimeNow={dateTime}
					changeDisplay={changeDisplay}
				/>
			))}
		</ul>
	);
};

export default TodoList;
