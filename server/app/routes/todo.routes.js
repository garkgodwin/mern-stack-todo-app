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
	const todoController = require('../controllers/todo.controller.js');
	var router = require('express').Router();

	//? THIS ROUTE WILL CREATE NEW TODO WITH THE PARAMS ACCCOUNT's ID
	router.post('/create/:accountid', todoController.createOne);

	//? THIS ROUTE WILL SELECT ONE TODO FROM THE LIST
	router.get('/:todoid', todoController.selectOne);

	//? THIS ROUTE WILL UPDATE TODO WITH PARAMS ACCOUNT ID AND TODO ID
	router.patch('/update/:todoid', todoController.updateOne);

	//? This Route will update single thing : isDone
	router.patch('/update/isDone/:todoid', todoController.updateIsDone);

	//? This ROUTE WILL DELETE THE EXISTING TODO WITH ID
	router.delete('/delete/:accountid/todo/:todoid', todoController.deleteOne);

	//? THIS ROUTE WILL GET ALL THE TODOS OF A USER USING ACCOUNT ID
	router.get('/all/:accountid', todoController.getTodosByUser);

	//! ADD MORE ROUTE

	app.use('/api/v1/todos', router);
};
