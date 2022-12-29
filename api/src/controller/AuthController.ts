import * as express from 'express';
import {login, refreshToken, signup} from "../services/AuthService";
import {body, checkSchema, validationResult} from 'express-validator';
import {authLoginValidator, authSignupValidator} from "../validator/AuthValidator";
import {checkRefreshToken, checkToken} from "../services/JwtService";
import { ApiResponse } from '../payload/ApiResponse';

export const AuthController = express.Router();

AuthController.put('/login', checkSchema(authLoginValidator as any), async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json(new ApiResponse().withMessage("Vérifier vos informations").build());
	}

	login(req.body).then((payload) => {
		res.status(payload.getHttpStatus()).json(payload);
	});
});

AuthController.put("/me/token/refresh", async (req,res) => {
	const authorization = <string>req.headers["authorization"];
	const response = await refreshToken(authorization);

	if (response.getSuccess()) {
		res.setHeader("token", (response.getPayload() as any).accessToken);
	}
	res.status(response.getHttpStatus()).send(response);
});

AuthController.post('/signup', checkSchema(authSignupValidator as any), (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const response = new ApiResponse()
			.withSuccess(false)
			.withMessage(errors.array().flatMap(error => error.msg).join(", "))
			.withHttpStatus(400).build();

		console.log("errors==", response);
		return res.status(response.getHttpStatus()).json(response);
	}

	signup(req.body).then(() => {
		const response = new ApiResponse().withSuccess(true).withMessage("Utilisateur crée").withHttpStatus(201).build();
		res.status(response.getHttpStatus()).json(response);
	}).catch((error) => {
				res.status(500).json({
					error: error
				});
			}
		);
});
