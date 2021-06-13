import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import CustomNavBar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Profile from './components/Profile';
import TodoForm from './components/TodoForm';
import Loading from './components/Loading';
import Page404 from './components/Page404';
import SignupForm from './components/SignupForm';

function App() {
	let [loginDetails, setLoginDetails] = useState({
		username: '',
		password: '',
		userId: '',
		email: '',
		firstname: '',
		lastname: '',
	});
	const [todo, setTodo] = useState({
		title: '',
		description: '',
		isDone: false,
		priority: 1,
		dueDate: '',
	});

	let [isLoaded, setIsLoaded] = useState(true);
	let [error, setError] = useState({
		title: '',
		message: '',
	});
	useEffect(() => {
		//? FIRST OPEN RUN
		if (
			localStorage.getItem('userId') === undefined ||
			localStorage.getItem('userId') === null ||
			localStorage.getItem('userId') === ''
		) {
			setLoginDetails({});
		}
	}, []);

	useEffect(() => {
		if (loginDetails === null) {
			setLoginDetails({
				username: '',
				password: '',
				userId: '',
				email: '',
				firstname: '',
				lastname: '',
			});
		}
	}, [loginDetails]);

	useEffect(() => {
		if (error.title !== '') {
			confirmAlert({
				customUI: ({ onClose }) => {
					return (
						<div
							className="custom-ui bg-warning d-flex flex-column justify-content-center align-items-center px-3 py-3
						rounded-pill">
							<h1 className="text-white text-muted">
								{error.title}
							</h1>
							<p>{error.message}</p>
							<button
								className="btn btn-primary"
								onClick={onClose}>
								Ok
							</button>
						</div>
					);
				},
			});
			setError({
				title: '',
				message: '',
			});
		}
	}, [error]);
	return (
		<div
			className="container-fluid bg-transparent d-flex flex-column px-0 py-0  align-items-center justify-content-center"
			id="App">
			{!isLoaded && <Loading />}
			<Router>
				<CustomNavBar
					setIsLoaded={setIsLoaded}
					setInputTodo={setTodo}
				/>
				<Switch>
					<Route
						exact
						path="/"
						render={(props) => (
							<Home
								{...props}
								isLoaded={isLoaded}
								setIsLoaded={setIsLoaded}
								setError={setError}
							/>
						)}
					/>
					<Route
						exact
						path="/form"
						render={(props) => (
							<TodoForm
								{...props}
								isLoaded={isLoaded}
								setIsLoaded={setIsLoaded}
								setError={setError}
								todo={todo}
								setTodo={setTodo}
							/>
						)}
					/>
					<Route
						exact
						path="/profile"
						render={(props) => (
							<Profile
								{...props}
								isLoaded={isLoaded}
								setIsLoaded={setIsLoaded}
								setError={setError}
							/>
						)}
					/>
					<Route
						exact
						path="/login"
						render={(props) => (
							<LoginForm
								{...props}
								setIsLoaded={setIsLoaded}
								isLoaded={isLoaded}
								setError={setError}
							/>
						)}
					/>
					<Route
						exact
						path="/signup"
						render={(props) => (
							<SignupForm
								{...props}
								setError={setError}
								setIsLoaded={setIsLoaded}
							/>
						)}
					/>
					<Route component={Page404} />
				</Switch>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
