import {Schema, model} from "mongoose";
import * as bcrypt from "bcrypt";

const usersSchema = new Schema({
	firstname: String,
	lastname: String,
	email: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	password: {
		type: String,
		required: true
	},
});

usersSchema.methods.comparePassword = (candidatePassword, cb) => {
	bcrypt.compare(candidatePassword, (this as any).password, (err, isMatch) => {
		if (err) {
			return cb(err);
		}

		cb(null, isMatch);
	});
};

export default model('users', usersSchema);
