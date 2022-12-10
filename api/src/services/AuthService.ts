import {LoginInterface, SignupInterface} from "../interface/auth.interface";
import * as bcrypt from "bcrypt";
import Users from "../database/models/Users";
import {generateAccessToken, generateRefreshToken} from "./JwtService";
import {ApiResponse} from "../payload/ApiResponse";
import users from "../database/models/Users";

export const signup = (payload: SignupInterface): Promise<any> => {
	return bcrypt.hash(payload.password, 10).then((hash) => {
		const user = new Users({
			email: payload.email,
			password: hash,
			firstname: payload.firstname,
			lastname: payload.lastname
		});

		return user.save();
	});
}

export const login = async (payload: LoginInterface): Promise<ApiResponse<any>> => {
	const user = await users.findOne({email: payload.email});

	if (user) {
		const {err, data} = bcrypt.compare(payload.password, user.password);
		if (err) {
			throw err;
		}

		if (!data) {
			new ApiResponse<any>()
				.withHttpStatus(501)
				.withMessage("Vérifier vos identifiants")
				.build();
		}

		const accessToken = generateAccessToken({email: user.email, lastname: user.lastname, firstname: user.firstname});
		const refreshToken = generateRefreshToken({email: user.email, lastname: user.lastname, firstname: user.firstname});

		return new ApiResponse<any>()
			.withPayload({accessToken: accessToken, refreshToken: refreshToken})
			.build();
	}

	return new ApiResponse<any>()
		.withHttpStatus(501)
		.withMessage("Vérifier vos identifiants")
		.build();
}

export const refreshToken = async (req) => {
	const user = await users.findOne({email: req.userEmail});

	if (user) {
		const accessToken = generateAccessToken({email: user.email, lastname: user.lastname, firstname: user.firstname});
		const refreshToken = generateRefreshToken({email: user.email, lastname: user.lastname, firstname: user.firstname});

		return new ApiResponse<any>()
			.withPayload({accessToken: accessToken, refreshToken: refreshToken})
			.build();
	}


	return new ApiResponse<any>()
		.withHttpStatus(501)
		.withMessage("Vérifier vos identifiants")
		.build();

}