import { Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import videoToken from "../controllers/videoToken";
import tokenService from "../service/tokenService";
import dbg from "debug";
const debug = dbg("api:token");
dotenv.config();
router.post("/token", async (req, res) => {
	//debug(req.headers);
	//debug(req.headers.authorization);
	await tokenService(req.headers.authorization)
		.then((response) => {
			debug(response);
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.message });
		});
});

router.get("/video/token", (req, res) => {
	const identity = req.query.identity;
	const room = req.query.room;
	const token = videoToken(identity, room);
	res.send({
		token: token.toJwt(),
	});
});
router.post("/video/token", (req, res) => {
	console.log("here");
	const identity = req.body.identity;
	const room = req.body.room;
	const token = videoToken(identity, room);
	console.log(token);
	res.send({
		token: token.toJwt(),
	});
});
export default router;
