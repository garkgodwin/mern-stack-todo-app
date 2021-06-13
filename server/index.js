const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
//
const app = express();
const URI = process.env.ATLAS_URI;
const PORT = process.env.PORT || 5000;

//!Midlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//!MONGODB connection
mongoose.connect(URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB connection established successfully.');
});

//!ROUTES
require('./app/routes/account.routes.js')(app);
require('./app/routes/todo.routes.js')(app);

//!Listen to port
app.listen(PORT, () => {
	console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});
