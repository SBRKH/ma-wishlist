import {LoginInterface, SignupInterface} from "../interface/auth.interface";
import * as bcrypt from "bcrypt";
import Users from "../database/models/Users";
import {generateAccessToken, generateRefreshToken} from "./JwtService";
import {ApiResponse} from "../payload/ApiResponse";
import users from "../database/models/Users";
import * as jwt from "jsonwebtoken";

export const signup = (payload: SignupInterface): Promise<any> => {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(payload.password, salt);

	const user = new Users({
		email: payload.email,
		password: hash,
		firstname: payload.firstname,
		lastname: payload.lastname
	});

	return user.save();
}

export const login = async (payload: LoginInterface): Promise<ApiResponse<any>> => {
	const user = await users.findOne({email: payload.email});

	if (user) {
		const match = await bcrypt.compareSync(payload.password, user.password);

		if (!match) {
			return new ApiResponse<any>()
				.withSuccess(false)
				.withHttpStatus(401)
				.withMessage("Vérifier vos identifiants")
				.build();
		}

		const accessToken = generateAccessToken({email: user.email, lastname: user.lastname, firstname: user.firstname});
		const refreshToken = generateRefreshToken({email: user.email, lastname: user.lastname, firstname: user.firstname});
		const {firstname, lastname, email, _id} = user;

		return new ApiResponse<any>()
			.withSuccess(true)
			.withPayload({accessToken: accessToken, refreshToken: refreshToken, firstname, lastname, email, id: _id})
			.build();
	}

	return new ApiResponse<any>()
		.withSuccess(false)
		.withHttpStatus(401)
		.withMessage("Vérifier vos identifiants")
		.build();
}

export const refreshToken = async (authorization: string) => {
	if (typeof authorization === "undefined") {
		return new ApiResponse().withHttpStatus(403).withSuccess(false).build();
	}

	const bearer = authorization.split(" ");
	const token = bearer[1];
	const { firstname, lastname, email, password, id} = jwt.decode(token);
	const accessToken = jwt.sign({ firstname, lastname, email, password, id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

	return new ApiResponse().withPayload({ accessToken}).build();
}