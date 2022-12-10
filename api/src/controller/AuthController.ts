import * as express from 'express';
import {login, refreshToken, signup} from "../services/AuthService";
import {body, checkSchema, validationResult} from 'express-validator';
import {authLoginValidator, authSignupValidator} from "../validator/AuthValidator";
import {checkRefreshToken, checkToken} from "../services/JwtService";

export const AuthController = express.Router();

AuthController.put('/login', checkSchema(authLoginValidator as any), async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array()
		});
	}

	login(req.body).then((payload) => {
		res.status(payload.getHttpStatus()).json(payload);
	});
});

AuthController.post("/refreshToken", checkRefreshToken, (req,res) => {
	refreshToken(req).then((payload) => {
		res.status(payload.getHttpStatus()).json(payload);
	});
});

AuthController.post('/signup', checkSchema(authSignupValidator as any), (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array()
		});
	}

	signup(req.body).then(() => {
		res.status(201).json({
			message: 'User added successfully!'
		});
	})
		.catch((error) => {
				console.log("error==", error);
				res.status(500).json({
					error: error
				});
			}
		);
});
