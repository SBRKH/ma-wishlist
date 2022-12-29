import {NextFunction} from "express";

require('dotenv').config();
import * as jwt from "jsonwebtoken";
import {ApiResponse} from "../payload/ApiResponse";

export const generateAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
}

export const generateRefreshToken = (user) => {
	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "131400m"});
}

export const checkToken = (req, res, next) => {
	//Get the jwt token from the head
	const authorization = <string>req.headers["authorization"];
	console.log("authorization==", authorization);
	if (typeof authorization === "undefined") {
		res.status(403);
	}

	const bearer = authorization.split(" ");
	const token = bearer[1];
	let jwtPayload;

	try {
		const { firstname, lastname, email, password, id} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		jwtPayload = { firstname, lastname, email, password, id};
		res.locals.jwtPayload = { firstname, lastname, email, password, id};
	} catch (error) {
		console.log("err==", error);
		res.status(403).send(new ApiResponse().withHttpStatus(403).withSuccess(false).withPayload(error).build());
		return;
	}

	const newToken = jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1h"
	});
	res.setHeader("token", newToken);
	next();
};

export const checkRefreshToken = (req, res, next) => {
	const authorization = <string>req.headers["authorization"];
	if (typeof authorization === "undefined") {
		return new ApiResponse().withHttpStatus(403).withSuccess(false).build();
	}

	const bearer = authorization.split(" ");
	const token = bearer[1];
	const { firstname, lastname, email, password, id}= jwt.decode(token);
	const accessToken = jwt.sign({ firstname, lastname, email, password, id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

	return new ApiResponse().withPayload({ accessToken}).build();
};