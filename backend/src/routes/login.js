import { Router } from "express";
const router = Router();
import { check, validationResult } from "express-validator";
import dbg from "debug";
const debug = dbg("api:login");
import loginService from "../service/loginService";
router.post(
	"/login",
	[
		check("email", "Valid Email required").isEmail(),
		check("password", "Please enter a valid password").isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			//debug(errors);
			return res.status(406).send({
				msg: errors,
			});
		}
		await loginService(req.body)
			.then((response) => {
				res.send(response);
			})
			.catch((err) => {
				debug(err);
				res.status(500).send({ message: err.msg });
			});
	}
);
export default router;
