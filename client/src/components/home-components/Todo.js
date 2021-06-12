import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import {
	BsXSquareFill,
	BsArrowClockwise,
	BsCalendarFill,
	BsClockFill,
	BsFillSquareFill,
	BsPen,
} from 'react-icons/bs';
import dateFormat from 'dateformat';
import { css } from '@emotion/react';
import Loading from '../Loading';
import PropagateLoader from 'react-spinners/PropagateLoader';

const ConvertDueDate = ({ dueDate }) => {
	const [dateTime, setDateTime] = useState(new Date());
	let due = new Date(dueDate);
	const [isDue, setIsDue] = useState(false);
	useEffect(() => {
		const interval = setInterval(async () => {
			await setDateTime(new Date());
			if (dateTime >= due) {
				setIsDue(true);
				clearInterval(interval);
			} else {
				setIsDue(false);
				clearInterval(interval);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [dateTime]);

	const day = dateFormat(due, 'dddd, mmmm dS, yyyy');
	const time = dateFormat(due, 'hh:MM:ss TT');
	return (
		<li className="list-group-item d-flex w-100 flex-row align-items-center justify-content-between px-3 py-3">
			<p>Due Date and Time:</p>
			{isDue ? (
				<div className="bg-danger px-3 py-3">
					<div className="text-light">
						<BsCalendarFill className="me-3" />
						{day}
					</div>
					<div className="text-light">
						<BsClockFill className="me-3" />
						{time}
					</div>
				</div>
			) : (
				<div className="bg-white px-3 py-3">
					<div>
						<BsCalendarFill className="me-3" />
						{day}
					</div>
					<div>
						<BsClockFill className="me-3" />
						{time}
					</div>
				</div>
			)}
		</li>
	);
};

//? THIS PART IS FOR CREATE AT AND UPDATED AT
const ConvertCreatedAt = ({ createdAt }) => {
	let createdDate = new Date(createdAt);
	const date = dateFormat(createdDate, 'dddd, mmmm d, yyyy hh:MM:ss TT');
	const day = dateFormat(createdDate, 'dddd, mmmm d, yyyy');

	return (
		<div className="position-absolute d-flex flex-column align-items-end top-0 end-0 mt-2 me-2 d-none d-sm-block d-sm-none d-md-block">
			<div>
				<BsPen className="me-2" />
				<small className="lead">{day}</small>
			</div>
			<div className="text-muted text-end">
				<small className="">Created {moment(date).fromNow()}</small>
			</div>
		</div>
	);
};

const ConvertUpdatedAt = ({ updatedAt }) => {
	let updatedDate = new Date(updatedAt);
	const day = dateFormat(updatedDate, 'dddd, mmmm d, yyyy hh:MM:ss TT');
	const time = dateFormat(updatedDate, 'hh:MM:ss TT');
	return (
		<div className="ms-2 d-flex align-items-center">
			<div className="text-muted text-end">
				<small className="">Updated {moment(day).fromNow()}</small>
			</div>
		</div>
	);
};

//? THIS PART IS FOR PRIORITY LEVEL
const levelToString = (priority) => {
	let value = 'Lowest Priority ';
	if (priority === 1) {
		value = 'You can ignore this if you want.';
	} else if (priority === 2) {
		value = 'You can relax, you got time and no worries.';
	} else if (priority === 3) {
		value = 'You have time, but this takes time.';
	} else if (priority === 4) {
		value = 'Must do it today.';
	} else {
		value = 'Must do it now!';
	}
	return value;
};
const ConvertToReadableLevel = ({ priority }) => {
	const items = [];
	for (let i = 0; i < priority; i++) {
		items.push(
			<BsFillSquareFill
				key={i}
				className="text-danger bg-gradient ms-1 rounded"
			/>
		);
	}
	return (
		<li className="list-group-item d-flex flex-row align-items-center w-100 justify-content-between">
			<p className="">Priority Level:</p>
			<p className="text-muted ">{levelToString(priority)}</p>
			<div className="d-flex flex-column align-items-end">
				<p className="text-dark h5">{priority}</p>
				<div className="d-flex flex-row">{items}</div>
			</div>
		</li>
	);
};

const Todo = ({ todo, setTodos, changeDisplay, setError, dateTimeNow }) => {
	//TODO: Make the loading screen exact to the screen, loading screen bug if scrolled down,
	//!Fix it
	//?
	const history = useHistory();
	let todoId = todo._id;
	const title = todo.title;
	const description = todo.description;
	const dueDate = todo.dueDate;
	const isDone = todo.isDone;
	const priority = todo.priority;
	const createdAt = todo.createdAt;
	const updatedAt = todo.updatedAt;

	const [isLoaded, setIsLoaded] = useState(true);

	const handleUpdate = () => {
		localStorage.setItem('todoId', todoId);
		console.log(localStorage.getItem('todoId'));
		history.push('/form');
	};
	const handleDelete = () => {
		console.log('DELETE: ' + todoId);
		const userId = localStorage.getItem('userId');
		deleteTodo(userId, todoId);
	};

	const deleteTodo = async (userId, todoId) => {
		setIsLoaded(false);
		await axios
			.delete(
				`http://localhost:5000/api/v1/todos/delete/${userId}/todo/${todoId}`
			)
			.then((res) => {
				fetchTodos(userId);
				setIsLoaded(true);
			})
			.catch((err) => {
				setError({
					title: 'Error Encountered',
					message: 'Encountered an error while deleting todo item',
				});
				setIsLoaded(true);
			});
	};

	const fetchTodos = async (userId) => {
		setIsLoaded(true);
		await axios
			.get(`http://localhost:5000/api/v1/todos/all/${userId}`)
			.then((response) => {
				setTodos(response.data);
				setIsLoaded(true);
			})
			.catch((error) => {
				setError({
					title: 'Error Encountered',
					message:
						'Encountered an errror while retrieving todos after deleting',
				});
				setIsLoaded(true);
			});
	};

	const onCheckChange = async (e) => {
		localStorage.setItem('todoId', todoId);
		//set new value
		const userId = localStorage.getItem('userId');
		setIsLoaded(false);

		let isDone = e.target.checked;
		console.log(isDone);
		console.log(todo._id);

		await axios
			.patch(
				`http://localhost:5000/api/v1/todos/update/isDone/${todoId}`,
				{ isDone: isDone }
			)
			.then((res) => {
				fetchTodos(userId);
			})
			.catch((err) => {
				console.log(err);
				setIsLoaded(true);
			});
	};
	const override = css`
		display: block;
		margin: 0 auto;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		border-color: red;
		height: 100%;
		width: 100%;
		z-index: 1000;
	`;

	return (
		<div>
			{!changeDisplay ? (
				<label
					htmlFor={'check-box ' + todoId}
					role="button"
					className={
						isDone
							? 'card px-4 py-4 mb-3 w-100 cursor-pointer opacity-3'
							: 'card px-4 py-4 mb-3 w-100 cursor-pointer'
					}>
					{!isLoaded && (
						<PropagateLoader
							color={'red'}
							loading={!isLoaded}
							size={50}
							css={override}
							speedMultiplier={5}
						/>
					)}
					<input
						id={'check-box ' + todoId}
						className="form-check-input"
						onChange={onCheckChange}
						checked={isDone}
						type="checkbox"
					/>

					<div className="card-body">
						<h5 className="card-title float-left">{title}</h5>
						<ConvertCreatedAt createdAt={createdAt} />
						<p className="card-text">{description}</p>
					</div>
					<ul className="list-group list-group-flush">
						<ConvertToReadableLevel priority={priority} />
						<ConvertDueDate
							dueDate={dueDate}
							dateTimeNow={dateTimeNow}
						/>
					</ul>
					<div className="card-body d-flex w-100 justify-content-between">
						<div className="d-flex flex-row">
							<button
								onClick={handleUpdate}
								className="btn btn-warning px-2 py-">
								<BsArrowClockwise className="me-2" />
								<small>Update</small>
							</button>
							<ConvertUpdatedAt updatedAt={updatedAt} />
						</div>
						<div>
							<button
								onClick={handleDelete}
								className="btn btn-dark px-2 py-2">
								<BsXSquareFill className="me-2" />
								<small>Delete</small>
							</button>
						</div>
					</div>
				</label>
			) : (
				<label
					htmlFor={'check-box ' + todoId}
					role="button"
					className={
						isDone
							? 'card px-4 py-4 mb-3 w-100 cursor-pointer opacity-3'
							: 'card px-4 py-4 mb-3 w-100 cursor-pointer'
					}>
					{!isLoaded && (
						<PropagateLoader
							color={'red'}
							loading={!isLoaded}
							size={50}
							css={override}
							speedMultiplier={5}
						/>
					)}
					<input
						id={'check-box ' + todoId}
						className="form-check-input"
						onChange={onCheckChange}
						checked={isDone}
						type="checkbox"
					/>
					<div className="card-body">
						<h5 className="card-title float-left">{title}</h5>
						<ConvertCreatedAt createdAt={createdAt} />
						<p className="card-text">{description}</p>
					</div>
				</label>
			)}
		</div>
	);
};

export default Todo;
