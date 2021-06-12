import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import {
	BsCardText,
	BsEnvelope,
	BsPerson,
	BsLock,
	BsClockFill,
} from 'react-icons/bs';

const AccountForm = ({ setIsLoaded, setError }) => {
	const history = useHistory();
	const [accountDetails, setAccountDetails] = useState({
		firstname: '',
		lastname: '',
		username: '',
		email: '',
		password: '',
	});

	useEffect(() => {}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			accountDetails.firstname === '' &&
			accountDetails.lastname === '' &&
			accountDetails.username === '' &&
			accountDetails.email === '' &&
			accountDetails.password === ''
		) {
			setError({
				title: 'System Message',
				message: 'Please complete the fields',
			});
			return;
		}
		setIsLoaded(true);
		confirmAlert({
			title: 'System Message',
			message: 'Would you like to create this account?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						createAccount();
					},
				},
				{
					label: 'No',
					onClick: () => {
						setIsLoaded(true);
						return; //RETURN NOTHING
					},
				},
			],
		});
	};
	const createAccount = async () => {
		setIsLoaded(false);
		await axios
			.post(
				'http://localhost:5000/api/v1/accounts/register',
				accountDetails
			)
			.then((res) => {
				console.log(res);
				if (typeof res.data === 'string') {
					//? This means failed to create an account
					setIsLoaded(true);
					confirmAlert({
						title: 'System Message',
						message: res.data,
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
					const data = res.data;
					confirmAlert({
						title: 'System Message',
						message: 'Would you like to login?',
						buttons: [
							{
								label: 'Yes',
								onClick: () => {
									setIsLoaded(true);
									localStorage.setItem('userId', data._id);
									localStorage.setItem(
										'username',
										data.username
									);
									localStorage.setItem(
										'password',
										data.password
									);
									history.push('/');
								},
							},
							{
								label: 'No',
								onClick: () => {
									setIsLoaded(true);
									return; //RETURN NOTHING
								},
							},
						],
					});
				}
				setIsLoaded(true);
			})
			.catch((err) => {
				console.log(err);
				setIsLoaded(true);
			});
	};

	//DISPLAY
	return (
		<Form
			onSubmit={handleSubmit}
			className="form bg-dark rounded h-auto w-auto d-flex flex-column
            justify-content-center bg-dark align-items-center px-3 py-3 text-dark w-50 ">
			<div className="bg-dark">
				<div className="shadow-lg p-3 mb-2 bg-dark card">
					<h3 className="text-light">Who are you?</h3>
					<div
						className="wrap-input100 validate-input"
						data-validate="First name is required">
						<input
							className="input100"
							type="text"
							name="firstname"
							placeholder="Enter First Name"
							onChange={(e) =>
								setAccountDetails({
									...accountDetails,
									firstname: e.target.value,
								})
							}
							value={accountDetails.firstname}
						/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<BsCardText />
						</span>
					</div>
					<div
						className="wrap-input100 validate-input"
						data-validate="Last name is required">
						<input
							className="input100"
							type="text"
							name="lastname"
							placeholder="Enter Last Name"
							onChange={(e) =>
								setAccountDetails({
									...accountDetails,
									lastname: e.target.value,
								})
							}
							value={accountDetails.lastname}
						/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<BsCardText />
						</span>
					</div>
				</div>

				<div role="separator" className="dropdown-divider"></div>

				<div className="shadow-lg p-3 mb-5 bg-dark card ">
					<h3 className="text-light">Your ways to login</h3>
					<div
						className="wrap-input100 validate-input"
						data-validate="Email is required">
						<input
							className="input100"
							type="email"
							name="email"
							placeholder="Enter Email"
							onChange={(e) =>
								setAccountDetails({
									...accountDetails,
									email: e.target.value,
								})
							}
							value={accountDetails.email}
						/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<BsEnvelope />
						</span>
					</div>

					<div
						className="wrap-input100 validate-input"
						data-validate="Username is required">
						<input
							className="input100"
							type="text"
							name="username"
							placeholder="Enter Username"
							onChange={(e) =>
								setAccountDetails({
									...accountDetails,
									username: e.target.value,
								})
							}
							value={accountDetails.username}
						/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<BsPerson />
						</span>
					</div>

					<div
						className="wrap-input100 validate-input"
						data-validate="Password is required">
						<input
							className="input100"
							type="password"
							name="password"
							placeholder="Enter Password"
							onChange={(e) =>
								setAccountDetails({
									...accountDetails,
									password: e.target.value,
								})
							}
							value={accountDetails.password}
						/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<BsLock />
						</span>
					</div>
				</div>
			</div>
			<div className=" d-flex flex-row justify-content-center align-items-center bg-transparent w-100">
				<button className="login100-form-btn" type="submit">
					Submit
				</button>
			</div>
		</Form>
	);
};

export default AccountForm;
