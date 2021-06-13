import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import Tilt from 'react-parallax-tilt';
import logo512 from '../static/images/logo512.png';

const isDateValid = (dateString) => {
	let validity = {
		message: '',
		isValid: false,
	};
	try {
		const d = new Date(dateString);
		if (d < new Date()) {
			validity = {
				message: 'Please make sure your date is valid.',
				isValid: false,
			};
			return validity;
		}
		return {
			isValid: true,
			message: 'Your date and time is valid',
		};
	} catch (err) {
		validity = {
			message: 'Encountered an error in date time',
			isValid: false,
		};
		return validity;
	}
};

const checkInputs = (todo) => {
	let returnValue = false;
	let message = '';
	const validity = isDateValid(todo.dueDate);
	if (todo.title === '') {
		message = 'Please make sure title is not empty';
	} else if (todo.dueDate === '') {
		message = 'Please make sure your Due Date is valid';
	} else if (todo.dueDate !== '' && !validity.isValid) {
		message = validity.message;
	} else if (todo.priority < 1 && todo.priority > 5) {
		message = 'Please make sure no hacking...';
	} else {
		//save
		returnValue = true;
	}
	return {
		message: message,
		isValid: returnValue,
	};
};

const convertDateToControl = (dateString) => {
	const convertedDate = `${new Date(dateString).getFullYear()}-${`${
		new Date(dateString).getMonth() + 1
	}`.padStart(2, 0)}-${`${new Date(dateString).getDate()}`.padStart(
		2,
		0
	)}T${`${new Date(dateString).getHours()}`.padStart(2, 0)}:${`${new Date(
		dateString
	).getMinutes()}`.padStart(2, 0)}`;
	return convertedDate;
};

const TodoForm = ({
	isLoaded,
	setIsLoaded,
	loginDetails,
	setError,
	todo,
	setTodo,
}) => {
	const history = useHistory();
	const [todoId, setTodoId] = useState('');
	useEffect(() => {
		//? FIRST OPEN RUN
		if (
			localStorage.getItem('userId') === undefined ||
			localStorage.getItem('userId') === null ||
			localStorage.getItem('userId') === ''
		) {
			console.log('NO ID');
			history.push('/login');
		} else {
			window.scrollTo(0, 0); //force to scroll top
			console.log('UserId: ' + localStorage.userId);
			if (
				localStorage.getItem('todoId') === undefined ||
				localStorage.getItem('todoId') === null ||
				localStorage.getItem('todoId') === ''
			) {
				setTodoId('');
				setTodo({
					title: '',
					description: '',
					isDone: false,
					priority: 1,
					dueDate: '',
				});
			} else {
				setTodoId(localStorage.getItem('todoId'));
			}
		}
		setIsLoaded(true);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		console.log('TODO ID: ' + todoId);
		if (todoId === '' || todoId === null || todoId === undefined) {
			return;
		}
		fetchTodo();
		// eslint-disable-next-line
	}, [todoId]);

	const fetchTodo = async () => {
		setIsLoaded(false);
		await axios
			.get(`http://localhost:5000/api/v1/todos/${todoId}`)
			.then((data) => {
				console.log(data.data);
				const myTodo = data.data;
				setTodo({
					title: myTodo.title,
					description: myTodo.description,
					dueDate: convertDateToControl(myTodo.dueDate),
					isDone: myTodo.isDone,
					priority: myTodo.priority,
				});
				setIsLoaded(true);
			})
			.catch((error) => {
				console.log(error);
				setTodo({
					title: '',
					description: '',
					dueDate: '',
					isDone: false,
					priority: 1,
				});

				setIsLoaded(true);
			});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoaded(false);
		const validity = checkInputs(todo);
		console.log('ISVALID: ', validity);
		if (validity.isValid) {
			console.log(todo);
			if (todoId === null || todoId === '') {
				//?CREATE TODO
				const userId = localStorage.getItem('userId');
				await axios
					.post(
						`http://localhost:5000/api/v1/todos/create/${userId}`,
						todo
					)
					.then((response) => {
						const data = response.data;
						console.log(data);
						if (data.code !== undefined || data.code !== null) {
							if (data.code === 11000 || data.code === 11001) {
								setError({
									title: 'Invalid Input',
									message: 'This todo title already exist',
								});
							} else {
								if (
									data._id === undefined ||
									data._id === null
								) {
									const errors = data.errors;
									console.log(errors);
									if (errors.title.kind === 'minlength') {
										setError({
											title: 'Input Error',
											message:
												'The minimum length of title is 2 characters.',
										});
									}
									setIsLoaded(true);
									return;
								} else {
									setTodo({
										title: '',
										description: '',
										dueDate: '',
										isDone: false,
										priority: 1,
									});
									confirmAlert({
										title: 'Success',
										message: 'Todo created successfully',
										buttons: [
											{
												label: 'Ok',
												onClick: () => {
													return; //RETURN NOTHING
												},
											},
										],
									});
								}
							}
						}

						setIsLoaded(true);
					})
					.catch((err) => {
						console.log(err);
						setError({
							title: 'Todo Create Error',
							message: err.message,
						});
						setIsLoaded(true);
					});
			} else {
				//? UPDATE TODO
				await axios
					.patch(
						`http://localhost:5000/api/v1/todos/update/${todoId}`,
						todo
					)
					.then((response) => {
						setIsLoaded(true);
						localStorage.setItem('todoId', '');
						setTodo({
							title: '',
							description: '',
							dueDate: '',
							isDone: false,
							priority: 1,
						});
						confirmAlert({
							title: 'Success',
							message: 'Todo updated successfully',
							buttons: [
								{
									label: 'Ok',
									onClick: () => {
										history.replace('/');
										return; //RETURN NOTHING
									},
								},
							],
						});
					})
					.catch((err) => {
						setError({
							title: 'Todo Update Error',
							message: err.message,
						});
					});
			}
		} else {
			setIsLoaded(true);
			setError({
				title: 'Input Error',
				message: validity.message,
			});
		}
	};

	const title = () => {
		let title = 'New Todo';
		if (todoId === null || todoId === '') {
			title = 'New Todo';
		} else {
			title = 'Update Todo';
		}
		return title;
	};

	return (
		<div className="container mt-5 px-3 py-5 vh-100 vw-100 d-flex flex-column align-items-center">
			<div className="card d-flex flex-row justify-content-center align-items-center bg-dark w-75 h-auto">
				<div className="w-50 h-100 bg-transparent d-flex flex-column justify-content-center align-items-center">
					<h3 className="text-success ">Todo Form</h3>
					<Tilt
						className="d-flex justify-content-center align-items-center text-nowrap parallax-effect-glare-scale"
						perspective={500}
						glareEnable={true}
						glareMaxOpacity={0.45}
						scale={1.02}>
						<div className="inner-element d-flex justify-content-center align-items-center ">
							<img
								src={logo512}
								className="img-fluid"
								alt="Our Logo"
							/>
						</div>
					</Tilt>
				</div>
				<Form
					onSubmit={handleSubmit}
					className="p-3 mt-5 text-light h-100 w-50">
					<h4>{title()}</h4>
					<Form.Group>
						<Form.Label>Todo Title</Form.Label>
						<Form.Control
							className="border-0 border-bottom"
							type="text"
							placeholder="Please enter todo's title."
							onChange={(e) =>
								setTodo({ ...todo, title: e.target.value })
							}
							value={todo.title}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control
							type="text"
							as="textarea"
							rows={3}
							placeholder="Describe what you want to do."
							onChange={(e) =>
								setTodo({
									...todo,
									description: e.target.value,
								})
							}
							value={todo.description}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicDueDate">
						<Form.Label>Due Date</Form.Label>
						<Form.Control
							type="datetime-local"
							placeholder="Your desired due date."
							onChange={(e) =>
								setTodo({ ...todo, dueDate: e.target.value })
							}
							value={todo.dueDate}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Priority</Form.Label>
						<Form.Control
							as="select"
							placeholder="Select priority level."
							onChange={(e) =>
								setTodo({ ...todo, priority: e.target.value })
							}
							value={todo.priority}>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</Form.Control>
					</Form.Group>
					<div className="w-100 mt-3 d-flex flex-column align-items-center">
						{todoId === null || todoId === '' ? (
							<Button
								variant="primary"
								type="submit"
								className="btn btn-primary mt-3 w-50">
								Create
							</Button>
						) : (
							<Button
								variant="primary"
								type="submit"
								className="btn btn-primary mt-3 w-50">
								Update
							</Button>
						)}
					</div>
				</Form>
			</div>
		</div>
	);
};

export default withRouter(TodoForm);
