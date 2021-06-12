import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';

import { RiSearch2Line } from 'react-icons/ri';

import TodoList from './home-components/TodoList';
import SearchBar from './home-components/SearchBar';
import AlternativeDisplay from './home-components/AlternativeDisplay';

import { handleSearchChange } from '../helpers/search-value-helper';

const Home = ({ setError }) => {
	//TODO: MAKE A DESIGN FILTER!!! YES EASILY USING BOOTSTRAP
	const history = useHistory();
	let [todos, setTodos] = useState([]);
	let [modifiedTodos, setModifiedTodos] = useState([]);
	let [todosDisplayed, setTodosDisplayed] = useState(false); //?check if todos are displayed, else displaye alternative
	let [searchValue, setSearchValue] = useState({
		searchText: '',
		sortValue: 'Created',
		filterValue: 'All',
	});
	let [changeDisplay, setChangeDisplay] = useState(false);
	useEffect(() => {
		//? FIRST OPEN RUN
		console.log(localStorage.getItem('userId'));
		if (
			localStorage.getItem('userId') === undefined ||
			localStorage.getItem('userId') === null ||
			localStorage.getItem('userId') === ''
		) {
			console.log('NO ID');
			history.replace('/login');
			localStorage.setItem('todoId', '');
			return;
		} else {
			console.log('ID: ' + localStorage.userId);
			localStorage.setItem('todoId', '');
			fetchTodos(localStorage.userId);
			setSearchValue({
				searchText: '',
				sortValue: 'Created',
				filterValue: 'All',
			});
		}
	}, []);

	useEffect(() => {
		setModifiedTodos(handleSearchChange(searchValue, todos));
	}, [searchValue]);

	useEffect(() => {
		setModifiedTodos(handleSearchChange(searchValue, todos));
	}, [todos]);

	useEffect(() => {}, [modifiedTodos]);

	const fetchTodos = async (userId) => {
		setTodosDisplayed(false);
		await axios
			.get(`http://localhost:5000/api/v1/todos/all/${userId}`)
			.then((response) => {
				setTodos(response.data);
				console.log('fecthed Todos');
				setTodosDisplayed(true);
			})
			.catch((error) => {
				setError(error);
			});
	};

	return (
		<div className="container d-flex flex-column align-items-center pl-0 mt-5 w-100 h-100 px-0 pt-5">
			<SearchBar
				setSearchValue={setSearchValue}
				searchValue={searchValue}
				setChangeDisplay={setChangeDisplay}
				changeDisplay={changeDisplay}
			/>
			{!todosDisplayed ? (
				<AlternativeDisplay />
			) : (
				<div className="px-0 py-3 w-100">
					<TodoList
						todos={modifiedTodos}
						setTodos={setTodos}
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						changeDisplay={changeDisplay}
					/>
				</div>
			)}
		</div>
	);
};

export default withRouter(Home);
