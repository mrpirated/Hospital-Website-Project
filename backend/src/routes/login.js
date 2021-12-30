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
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			//debug(errors);
			return res.status(406).send({
				msg: errors,
			});
		}
		loginService(req.body).then((response) => {
			//debug(response);
			if (response.success) {
				res.send({ msg: "Logged in!", token: response.token });
			} else {
				res.status(403).send({ msg: response.message });
			}
		});
	}
);
export default router;
