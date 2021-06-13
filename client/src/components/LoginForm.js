import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Tilt from 'react-parallax-tilt';
import loginImage from '../static/images/login-image.png';

import '../static/css/main.css';
import '../static/css/util.css';

const LoginForm = ({
	setIsLoaded,
	isLoaded,
	setError,
	setIsLoggedOut,
	isLoggedOut,
}) => {
	//TODO: implment the sharedprefs like android

	const history = useHistory();

	const [inputDetails, setInputDetails] = useState({
		username: '',
		password: '',
	});

	useEffect(() => {
		window.scrollTo(0, 0); //force to scroll top
		if (
			localStorage.getItem('userId') === undefined ||
			localStorage.getItem('userId') === null ||
			localStorage.getItem('userId') === ''
		) {
			setInputDetails({
				username: '',
				password: '',
			});
		} else {
			//from sign up continue log in
			//get input details from server
			const username1 = localStorage.getItem('username');
			const password1 = localStorage.getItem('password');
			setInputDetails({
				username: username1,
				password: password1,
			});
		}
	}, []);

	useEffect(() => {
		if (
			localStorage.getItem('userId') === undefined ||
			localStorage.getItem('userId') === null ||
			localStorage.getItem('userId') === ''
		) {
			return;
		} else {
			if (inputDetails.username !== '' && inputDetails.password !== '') {
				login();
			}
		}
		// eslint-disable-next-line
	}, [inputDetails]);

	const handleLogin = (e) => {
		e.preventDefault();
		if (inputDetails.username === '' || inputDetails.password === '') {
			console.log('Please complete the fields');
			setError({
				title: '...',
				message: 'Please complete the fields',
			});
			return;
		}
		login();
	};

	const login = async () => {
		setIsLoaded(false);
		await axios
			.post('http://localhost:5000/api/v1/accounts/login', inputDetails)
			.then((res) => {
				if (res.status === 200) {
					const data = res.data;
					if (data === 'Login Failed') {
						console.log('Failed To Login');
						setError({
							title: 'Login Failed',
							message:
								'Your username or password is incorrect. Please try again.',
						});
						setIsLoggedOut(false);
						setIsLoaded(true);
						return;
					}
					if (data === 'Login Error') {
						console.log('Login Error');
						setError({
							title: 'Login Error',
							message:
								'Encountered an error while loggin in. Please try again.',
						});
						setIsLoaded(true);
						return;
					}
					localStorage.setItem('userId', data._id);
					history.replace('/');
					setIsLoaded(true);
				}
			})
			.catch((err) => {
				console.log('error');
			});
		setIsLoaded(true);
	};
	return (
		<div
			className="container mt-5 vw-100 vh-100 
			d-flex flex-row align-items-center justify-content-center"
			id="login-form-container">
			<div
				className="card mt-5 d-flex flex-lg-row justify-content-center align-items-center
			shadow-lg p-3 mb-5 bg-body rounded">
				<div className="p-5 w-50 h-100 bg-transparent">
					<Tilt
						className="d-flex justify-content-center align-items-center text-nowrap parallax-effect-glare-scale"
						perspective={500}
						glareEnable={true}
						glareMaxOpacity={0.45}
						scale={1.02}>
						<div className="inner-element d-flex justify-content-center align-items-center ">
							<h1 className="text-success position-absolute ">
								Sign-in
							</h1>
							<img
								src={loginImage}
								className="img-fluid"
								alt="Login"
							/>
						</div>
					</Tilt>
				</div>
				<Form
					onSubmit={handleLogin}
					className="d-flex flex-column justify-content-center align-items-center px-3 py-5 w-50 h-100 text-dark">
					<div
						className="wrap-input100 validate-input"
						data-validate="Username is required">
						<input
							className="input100"
							type="text"
							name="username"
							placeholder="Enter Username"
							onChange={(e) =>
								setInputDetails({
									...inputDetails,
									username: e.target.value,
								})
							}
							value={inputDetails.username}
						/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-user" aria-hidden="true"></i>
						</span>
					</div>
					<div
						className="wrap-input100 validate-input"
						data-validate="Password is required">
						<input
							className="input100"
							type="password"
							name="pass"
							placeholder="Enter Password"
							onChange={(e) =>
								setInputDetails({
									...inputDetails,
									password: e.target.value,
								})
							}
							value={inputDetails.password}
						/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>

					<Form.Group controlId="formBasicCheckbox">
						<Form.Check
							type="checkbox"
							label="Remember me"
							className="text-muted"
						/>
					</Form.Group>
					<div className="container-login100-form-btn">
						<button className="login100-form-btn" type="submit">
							Sign-in
						</button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default withRouter(LoginForm);
