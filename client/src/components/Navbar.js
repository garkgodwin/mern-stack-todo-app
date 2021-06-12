import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const CustomNavBar = ({ setIsLoaded, setInputTodo }) => {
	const history = useHistory();

	const [isLoggedOut, setIsLoggedOut] = useState(true);

	useEffect(() => {
		//first run
		if (
			localStorage.getItem('userId') === undefined ||
			localStorage.getItem('userId') === null ||
			localStorage.getItem('userId') === ''
		) {
			setIsLoggedOut(true);
		} else {
			setIsLoggedOut(false);
		}

		const interval = setInterval(() => {
			if (
				localStorage.getItem('userId') === undefined ||
				localStorage.getItem('userId') === null ||
				localStorage.getItem('userId') === ''
			) {
				setIsLoggedOut(true);
			} else {
				setIsLoggedOut(false);
			}
		}, 100);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const handleLogout = () => {
		setIsLoaded(true);
		setIsLoggedOut(true);
		localStorage.setItem('userId', '');
		localStorage.setItem('todoId', '');
		history.replace('/login');
	};
	const handleCreate = () => {
		console.log(localStorage.getItem('todoId'));
		if (
			localStorage.getItem('todoId') === undefined ||
			localStorage.getItem('todoId') === null ||
			localStorage.getItem('todoId') === ''
		) {
			history.push('/form');
			return;
		} else {
			setInputTodo({
				title: '',
				description: '',
				dueDate: '',
				priority: 1,
				isDone: false,
			});
			localStorage.setItem('todoId', '');
			history.push('/form');
		}
	};

	const handleProfile = () => {
		localStorage.setItem('todoId', '');
		history.push('/profile');
	};

	const handleHome = () => {
		localStorage.setItem('todoId', '');
		history.push('/');
	};

	const handleSignIn = () => {
		history.push('/login');
	};
	const handleSignUp = () => {
		history.push('/signup');
	};
	return (
		<Navbar
			className="navbar opacity-4 mb-5"
			collapseOnSelect
			expand="lg"
			bg="dark"
			variant="dark"
			fixed="top">
			<Navbar.Brand
				onClick={handleHome}
				className="m-1 mx-4"
				role="button">
				Your List of Things To Do
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				{isLoggedOut ? (
					<Nav
						className="mr-auto justify-content-end"
						style={{ width: '100%' }}>
						<Nav.Link onClick={handleSignIn}>Sign-in</Nav.Link>
						<Nav.Link onClick={handleSignUp}>Sign-up</Nav.Link>
					</Nav>
				) : (
					<Nav
						className="mr-auto justify-content-end"
						style={{ width: '100%' }}>
						<Nav.Link onClick={handleHome}>Home</Nav.Link>
						<Nav.Link onClick={handleCreate}>Create</Nav.Link>
						<Nav.Link onClick={handleProfile}>Profile</Nav.Link>
						<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
					</Nav>
				)}
			</Navbar.Collapse>
		</Navbar>
	);
};

export default CustomNavBar;
