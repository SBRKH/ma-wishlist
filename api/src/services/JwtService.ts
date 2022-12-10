require('dotenv').config();
import * as jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
}

export const generateRefreshToken = (user) => {
	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "131400m"});
}

export const checkToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader.split(" ")[1];

	if (token == null) {
		return Promise.reject("Token is invalid");
	}

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return Promise.reject("Token is invalid");
		} else {
			req.user = user;
			next();
		}
	});
}

export const checkRefreshToken = (req, res, next) => {
	const refreshToken = req.body.refreshToken;
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decodedToken) => {
		if (err) {
			res.status(401).send('Unauthorized');
		}

		req.userEmail = decodedToken.email;
		next();
	});
};