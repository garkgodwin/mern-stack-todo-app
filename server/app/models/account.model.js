const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 5,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 5,
		},
		todos: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Todo',
			},
		],
	},
	{
		timestamps: true,
	}
);

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
