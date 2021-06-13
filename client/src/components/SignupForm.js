import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import AccountForm from './account-components/AccountForm';
import Tilt from 'react-parallax-tilt';
import loginImage from '../static/images/login-image.png';

const SignupForm = ({ setError, setIsLoaded }) => {
	useEffect(() => {
		window.scrollTo(0, 0); //force to scroll top
		setIsLoaded(true);
		if (
			localStorage.getItem('userId') === undefined ||
			localStorage.getItem('userId') === null ||
			localStorage.getItem('userId') === ''
		) {
			//proceed
		} else {
			setError({
				title: 'You are currently logged in.',
				message: 'This might be a bug, please contact the developer.',
			});
		}
		localStorage.setItem('todoId', '');
		// eslint-disable-next-line
	}, []);

	return (
		<div className="container-fluid d-flex justify-content-center align-items-center mt-5 mb-5 vw-auto vh-90 p-0">
			<div className="card mt-5 d-flex flex-lg-row-reverse justify-content-center align-items-center p-0 bg-dark ">
				<div className="w-50 h-100 bg-transparent px-5 py-5 d-flex flex-row justify-content-center align-items-center">
					<Tilt
						className="d-flex justify-content-center align-items-center text-nowrap parallax-effect-glare-scale track-on-window"
						perspective={500}
						glareEnable={true}
						glareMaxOpacity={0.75}
						glarePosition="all"
						scale={1.02}
						trackOnWindow={true}>
						<div className="inner-element d-flex justify-content-center align-items-center ">
							<h1 className="text-success position-absolute ">
								Sign up
							</h1>
							<img
								src={loginImage}
								className="img-fluid"
								alt="Login"
							/>
						</div>
					</Tilt>
				</div>
				<AccountForm setIsLoaded={setIsLoaded} setError={setError} />
			</div>
		</div>
	);
};

export default withRouter(SignupForm);
