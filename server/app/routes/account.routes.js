// Copyright 2021 Gark Godwin Duque
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

module.exports = (app) => {
	const accountController = require('../controllers/account.controller.js');
	var router = require('express').Router();

	//? Retrieve All Accounts
	router.get('/', accountController.getAll);

	//? Retrieve account Info
	router.get('/profile/:id', accountController.getProfile);

	//? Register Account
	router.post('/register', accountController.register);

	//? Update Account
	router.patch('/:id', accountController.updateOne);

	//? Delete Account
	router.delete('/:id', accountController.deleteOne);

	//? Login Account
	router.post('/login', accountController.login);

	//!ADD MORE ROUTES FROM THE CONTROLLER

	app.use('/api/v1/accounts', router);
};
