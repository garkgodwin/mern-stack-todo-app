const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			minlength: 2,
		},
		description: {
			type: String,
		},
		priority: {
			type: Number,
			default: 1,
			min: 1,
			max: 5,
		},
		dueDate: {
			type: Date,
			required: true,
		},
		isDone: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
