const Todo = require('../models/todo.model.js');
const Account = require('../models/account.model.js');

exports.createOne = async (req, res) => {
	const accountId = req.params.accountid;
	const newTodo = new Todo({
		title: req.body.title,
		description: req.body.description,
		priority: req.body.priority,
		dueDate: req.body.dueDate,
		isDone: req.body.isDone,
	});
	await Todo.create(newTodo)
		.then((data) => {
			Account.findByIdAndUpdate(
				accountId,
				{ $push: { todos: data._id } },
				{ new: true, useAndModify: false }
			)
				.then((data) => {
					res.send(data);
				})
				.catch((err) => {
					res.send(err);
				});
		})
		.catch((err) => {
			res.send(err);
		});
};

exports.updateOne = async (req, res) => {
	const todoId = req.params.todoid;
	const newTodo = new Todo({
		title: req.body.title,
		description: req.body.description,
		priority: req.body.priority,
		dueDate: req.body.dueDate,
		isDone: req.body.isDone,
	});

	await Todo.updateOne(
		{ _id: todoId },
		{
			title: newTodo.title,
			description: newTodo.description,
			priority: newTodo.priority,
			dueDate: newTodo.dueDate,
			isDone: newTodo.isDone,
		}
	)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send(err);
		});
};

exports.updateIsDone = async (req, res) => {
	const todoId = req.params.todoid;
	const value = req.body.isDone;
	await Todo.findByIdAndUpdate({ _id: todoId }, { $set: { isDone: value } })
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
};

exports.deleteOne = async (req, res) => {
	const accountId = req.params.accountid;
	const todoId = req.params.todoid;
	await Todo.findByIdAndDelete({ _id: todoId })
		.then((response) => {
			if (response === null) {
				res.json('Not existing Todo');
				return;
			}
			Account.findByIdAndUpdate(
				{ _id: accountId },
				{ $pull: { todos: { $in: [todoId] } } }
			)
				.then((data) => {
					res.json(data);
				})
				.catch((err) => {
					res.json(err.message);
					return;
				});
		})
		.catch((err) => {
			res.json(err);
		});
};

exports.selectOne = async (req, res) => {
	const todoId = req.params.todoid;
	await Todo.findById({ _id: todoId })
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			res.send(err);
		});
};

exports.getTodosByUser = async (req, res) => {
	const accountid = req.params.accountid;
	await Account.findById({ _id: accountid })
		.populate('todos')
		.then((data) => {
			res.send(data.todos);
		})
		.catch((err) => {
			res.send(err.message);
		});
};
