import { SignupInterface } from "../interface/auth.interface";
import * as bcrypt from "bcrypt";
import User from "../database/models/Users";

export const signup = (payload: SignupInterface): Promise<any> => {
	return bcrypt.hash(payload.password, 10)
		.then((hash) => {
			const user = new User({
				email: payload.email,
				password: hash,
				firstname: payload.firstname,
				lastname: payload.lastname
			});

			return user.save();
		});
}