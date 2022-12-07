import * as express from 'express';
import {signup} from "../services/AuthService";
import {body, checkSchema, validationResult} from 'express-validator';
import {authSignupValidator} from "../validator/AuthValidator";

export const AuthController = express.Router();

AuthController.put('/login', (req, res) => {
	res.send('Login');
});

AuthController.put('/logout', (req, res) => {
	res.send('Logout');
});


AuthController.post('/signup', checkSchema(authSignupValidator as any) ,(req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array()
		});
	}

	signup(req.body)
		.then(() => {
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
