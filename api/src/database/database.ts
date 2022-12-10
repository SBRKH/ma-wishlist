require('dotenv').config();
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

export const connect = () => {
	mongoose.connect(mongoString, {useNewUrlParser: true});
	mongoose.set('strictQuery', false);
	const database = mongoose.connection;

	database.on('error', (error) => {
		console.log(error);
	});

	database.once('connected', () => {
		console.log('Database Connected');
	});
}