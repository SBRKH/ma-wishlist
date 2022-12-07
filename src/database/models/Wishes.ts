import {Schema, model} from "mongoose";

const wishesSchema = new Schema({
	link: String,
	price: Number,
	name: String,
	image: String
});

export default model('wishes', wishesSchema);
