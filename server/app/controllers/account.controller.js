const Account = require('../models/account.model.js');

exports.register = async (req, res) => {
	//Validate request
	//TODO: implement more validation
	//TODO: ADD MORE LIKE THIS
	if (!req.body.firstname) {
		res.status(400).send({
			message: 'Content cannot be empty',
			type: 'Error',
			error: 'CODE : 400',
		});
		return;
	}

	//?Create account
	const newAccount = new Account({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	});

	//check if username and email exist already
	const alreadyExistEmail = await Account.exists({ email: req.body.email });
	const alreadyExistUsername = await Account.exists({
		username: req.body.username,
	});
	//Save Account in db

	if (alreadyExistEmail) {
		res.json('This email already exists');
		return;
	}
	if (alreadyExistUsername) {
		res.json('This username already exists');
		return;
	}
	newAccount
		.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.json(err.message);
		});
};

exports.updateOne = async (req, res) => {
	if (!req.body) {
		res.status(400).json('Content cannot be empty');
		return;
	}

	//TODO: ADD VALidATION LIKE REGISTER
	const id = req.params.id;
	await Account.findByIdAndUpdate(id, req.body, { userFindAndModify: false })
		.then((data) => {
			if (!data) {
				res.status(404).json(
					`Cannot update account with ${id}. Maybe user not found!`
				);
			} else {
				res.send(data);
			}
		})
		.catch((err) => {
			res.json(err.message);
		});
};

exports.deleteOne = async (req, res) => {
	const id = req.params.id;
	await Account.findByIdAndDelete(id)
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Cannot delete account with ${id}. Maybe user not found!`,
				});
			} else {
				res.send({
					message: 'Account Deleted Successfully',
					type: 'Success',
					error: null,
				});
			}
		})
		.catch((err) => {
			res.send({
				message: 'Error Account Deletion',
				type: 'Error',
				error: err.message,
			});
		});
};

//?FOR LOGIN
exports.login = async (req, res) => {
	if (!req.body.username || !req.body.password) {
		res.status(400).send('Cannot be empty');
		return;
	}

	const login = {
		username: req.body.username,
		password: req.body.password,
	};

	//?CHECK USERNAME
	await Account.findOne({
		username: req.body.username,
	})
		.then((data) => {
			if (!data) {
				return res.json('Login Failed');
			}
			if (data.password !== login.password) {
				return res.json('Login Failed');
			}

			//success?
			res.status(200).send(data);
		})
		.catch((err) => {
			res.json('Login Error');
		});
};

exports.getProfile = async (req, res) => {
	const userId = req.params.id;
	await Account.findOne({
		_id: userId,
	})
		.then((account) => {
			res.status(200).send(account);
		})
		.catch((err) => {
			res.send('Error: ' + err.message);
		});
};

exports.getAll = async (req, res) => {
	await Account.find()
		.then((accounts) => {
			res.json(accounts);
		})
		.catch((err) => {
			res.send({
				message: 'Error Catched: ' + err.message,
				type: 'Error',
			});
		});
};
