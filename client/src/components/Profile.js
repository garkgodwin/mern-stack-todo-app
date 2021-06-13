import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import UpdateForm from './account-components/UpdateForm';
import profileImage from '../static/images/user-profile.png';

const Profile = ({ setIsLoaded, setError }) => {
	const history = useHistory();
	const [userProfile, setUserProfile] = useState({
		firstname: 'Fetching',
		lastname: 'Name...',
		username: 'Fetching username',
		email: 'Fetching email',
		password: '',
		todoCount: 0,
	});
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		window.scrollTo(0, 0); //force to scroll top
		setIsLoaded(false);
		if (
			localStorage.getItem('userId') === undefined ||
			localStorage.getItem('userId') === null ||
			localStorage.getItem('userId') === ''
		) {
			history.push('/login');
			return;
		} else {
			//set display profile
			const id = localStorage.getItem('userId');
			fetchProfile(id);
		}
		localStorage.setItem('todoId', '');
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (userProfile.username !== '') {
			console.log(userProfile);
		}
	}, [userProfile]);

	//Just
	useEffect(() => {
		window.scrollTo(0, 0); //force to scroll top

		const id = localStorage.getItem('userId');
		fetchProfile(id);
		// eslint-disable-next-line
	}, [isOpen]);

	const fetchProfile = async (userId) => {
		//TODO: Add more features by modifying account controller and the state user profile
		await axios
			.get(`http://localhost:5000/api/v1/accounts/profile/${userId}`)
			.then((response) => {
				const account = response.data;
				setUserProfile({
					userId: account._id,
					firstname: account.firstname,
					lastname: account.lastname,
					username: account.username,
					password: account.password,
					email: account.email,
					todoCount: account.todos.length,
				});
				setIsLoaded(true);
			})
			.catch((error) => {
				setIsLoaded(true);
				setError({
					title: 'Error Fetching Profile',
					message: error.message,
				});
			});
	};

	const todoMessage = () => {
		if (userProfile.todoCount === 1) {
			return `You have ${userProfile.todoCount} thing to do.`;
		} else if (userProfile.todoCount === 0) {
			return `You have nothing to do.`;
		} else {
			return `You have ${userProfile.todoCount} things to do.`;
		}
	};

	const handleUpdateClick = () => {
		if (!isOpen) {
			setIsOpen(true);
		} else {
			fetchProfile();
		}
	};

	return (
		<div
			className="container-fluid vw-90 vh-90 d-flex flex-column p-0 my-5 pt-5 px-5 d-flex justify-content-center align-items-center"
			id="profile-form-container bg-dark">
			<div className="text-dark d-flex flex-row justify-content-center align-items-center w-100">
				<div className="card border-3 d-flex flex-column bg-white h-100 w-100 m-0 p-0 position-relative top-0 left-0">
					<div className="d-flex flex-column justify-content-center align-items-center bg-transparent">
						<button
							onClick={handleUpdateClick}
							className="btn btn-primary position-absolute top-0 right-0">
							Edit Profile
						</button>
						<img
							className="img-fluid w-20 h-20"
							src={profileImage}
							alt="Profile"
						/>
						<h1 className="text-fluid">
							{userProfile.firstname + ' ' + userProfile.lastname}
						</h1>
					</div>
					<div className="d-lg-flex flex-column justify-content-center align-items-center">
						<div className="d-lg-flex flex-lg-row align-items-lg-center justify-content-center bg-dark w-100 h-auto m-0 pt-3 p-2">
							<p className="lead text-center w-100 h-100">
								Username: <br />
								{userProfile.username}
							</p>
							<p className="lead text-center text-fluid bg-warning w-100 h-100">
								Email: <br />
								{userProfile.email}
							</p>
						</div>
						<div className="d-flex flex-row justify-content-center bg-dark w-100 h-auto m-0 p-0">
							<p className="lead text-center border-bottom w-auto h-auto">
								{todoMessage()}
							</p>
						</div>
					</div>
				</div>
			</div>
			{isOpen && (
				<UpdateForm
					setIsLoaded={setIsLoaded}
					setIsOpen={setIsOpen}
					userProfile={userProfile}
					setError={setError}
				/>
			)}
		</div>
	);
};

export default withRouter(Profile);
