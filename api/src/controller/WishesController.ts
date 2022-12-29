import * as express from "express";
import {checkToken} from "../services/JwtService";
import {ApiResponse} from "../payload/ApiResponse";

export const WishesController = express.Router();

WishesController.get("/folders", checkToken, (req,res) => {
	res.status(200).json(new ApiResponse().withHttpStatus(200).withSuccess(true).withPayload({
		folders: []
	}));
});