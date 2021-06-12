import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';

const UpdateForm = ({ setIsLoaded, setIsOpen, setError }) => {
	const [accountDetails, setAccountDetails] = useState({
		firstname: '',
		lastname: '',
		username: '',
		email: '',
		password: '',
	});

	useEffect(() => {
		const userId = localStorage.getItem('userId');
		fetchProfile(userId);
	}, []);

	const fetchProfile = async (userId) => {
		//TODO: Add more features by modifying account controller and the state user profile
		await axios
			.get(`http://localhost:5000/api/v1/accounts/profile/${userId}`)
			.then((response) => {
				const account = response.data;
				setAccountDetails({
					userId: account._id,
					firstname: account.firstname,
					lastname: account.lastname,
					username: account.username,
					password: account.password,
					email: account.email,
				});
			})
			.catch((error) => {
				setError({
					title: 'Error',
					message:
						'Encountered an error while fetching your profile information.',
				});
			});
	};

	const updateAccount = async (e) => {
		e.preventDefault();
		const userId = localStorage.getItem('userId');
		await axios
			.patch(
				`http://localhost:5000/api/v1/accounts/${userId}`,
				accountDetails
			)
			.then((res) => {
				if (typeof res.data === 'string') {
					//? This means failed to create an account
					let message = '';
					if (res.data.includes('duplicate')) {
						if (res.data.includes('username')) {
							message = 'Username already exists';
						} else {
							message = 'Email already exists';
						}
					} else {
						message = res.data;
					}
					setIsLoaded(true);
					confirmAlert({
						title: 'System Message',
						message: message,
						buttons: [
							{
								label: 'Ok',
								onClick: () => {
									return; //RETURN NOTHING
								},
							},
						],
					});
					//means email or username already exist
				} else {
					//? Success creating account
					confirmAlert({
						title: 'Update Successful',
						message: 'You have updated your account!!!',
						buttons: [
							{
								label: 'Ok',
								onClick: () => {
									setIsOpen(false);
									setIsLoaded(true);
								},
							},
						],
					});
				}
				setIsLoaded(true);
			})
			.catch((err) => {
				setError({
					title: 'Update Error',
					message: err.message,
				});
				setIsLoaded(true);
			});
	};

	const handleCancelCick = (e) => {
		setIsOpen(false);
	};

	return (
		<div
			className="border-3 d-flex flex-column justify-content-center align-items-center bg-transparent 
            h-100 w-100 position-absolute m-0 p-5 top-0 left-0 bg-white">
			<div
				className="card d-flex 
                justify-content-center align-items-center 
            pt-3 border-3 bg-white w-100 h-100 mt-5 opacity-3"></div>

			<div className=" card bg-dark text-light card position-absolute d-flex align-items-center w-auto h-auto mt-5 py-5 px-5">
				<form className="form w-100 h-100" onSubmit={updateAccount}>
					<h2 className="w-100">Update Your Information</h2>
					<div className="form-group">
						<label htmlFor="update-firstname">First name:</label>
						<input
							type="text"
							className="form-control"
							id="update-firstname"
							placeholder="Enter First Name"
							value={accountDetails.firstname}
							onChange={(e) => {
								setAccountDetails({
									...accountDetails,
									firstname: e.target.value,
								});
							}}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="update-lastname">Last name:</label>
						<input
							type="text"
							className="form-control"
							id="update-lastname"
							placeholder="Enter Last Name"
							value={accountDetails.lastname}
							onChange={(e) => {
								setAccountDetails({
									...accountDetails,
									lastname: e.target.value,
								});
							}}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="update-email">Email:</label>
						<input
							type="email"
							className="form-control"
							id="update-email"
							placeholder="Enter Email"
							value={accountDetails.email}
							onChange={(e) => {
								setAccountDetails({
									...accountDetails,
									email: e.target.value,
								});
							}}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="update-username">Username:</label>
						<input
							type="text"
							className="form-control"
							id="update-username"
							placeholder="Enter Username"
							value={accountDetails.username}
							onChange={(e) => {
								setAccountDetails({
									...accountDetails,
									username: e.target.value,
								});
							}}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="update-password">Password:</label>
						<input
							type="password"
							className="form-control"
							id="update-password"
							placeholder="Enter password"
							value={accountDetails.password}
							onChange={(e) => {
								setAccountDetails({
									...accountDetails,
									password: e.target.value,
								});
							}}
						/>
					</div>
					<div className="form-group w-100 mt-2 d-flex flex-row-reverse justify-content-between align-items-center">
						<button className="btn btn-primary" type="submit">
							Update
						</button>
						<button
							className="btn btn-warning"
							onClick={handleCancelCick}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateForm;
