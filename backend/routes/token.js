import { Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
router.post("/token", (req, res) => {
	const token = req.body.token;
	//console.log(req.headers);
	//console.log("called");
	const user = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		//console.log(decoded);
		if (err) {
			//console.log(err);
			return false;
		}
		return decoded;
	});
	//console.log(user);
	if (!user) {
		res.status(201).send("not-verified");
	} else res.status(200).send(user);
});

export default router;
