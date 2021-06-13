const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema(
	{
		title: {
			type: String,
			unique: false,
			required: true,
			minlength: 2,
		},
		description: {
			unique: false,
			type: String,
		},
		priority: {
			type: Number,
			unique: false,
			default: 1,
			min: 1,
			max: 5,
		},
		dueDate: {
			unique: false,
			type: Date,
			required: true,
		},
		isDone: {
			unique: false,
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
