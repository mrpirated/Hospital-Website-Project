import { Router } from "express";
const router = Router();
import { check, validationResult } from "express-validator";
import connection from "../../dbconn/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const bcrypt = require("bcrypt");
router.post(
	"/signup",
	[
		check("first_name", "Name is required").not().isEmpty(),
		check("email", "Valid Email required").isEmail(),
		check(
			"password",
			"Please enter a password with 6 or more characters"
		).isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res
				.status(ErrorCode.HTTP_BAD_REQ)
				.json({ errors: errors.array() });
		}
		try {
			var value = {
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				dob: req.body.dob,
				gender: req.body.gender,
				address: req.body.address,
				email: req.body.email,
				phone: req.body.phone,
				password: req.body.password,
			};
			value.password = await bcrypt.hash(req.body.password, 10);

			console.log(value.password);
			var patient_id;
			var q = connection.query(
				"INSERT INTO patient SET ?",
				value,
				(err, results, fields) => {
					//console.log("jere");
					if (err) console.log(err);
					else {
						patient_id = results.insertId;
						//console.log(patient_id);
						//console.log(t);
					}
				}
			);
			// console.log(q);
			// console.log(value);
			// jwt.sign(
			// 	{
			// 		data: value,
			// 		patient_id,
			// 	},
			// 	process.env.SECRET_KEY,
			// 	{ expiresIn: 60 * 60 * 24 * 30 },
			// 	(err, token) => {
			// 		//console.log(token);
			// 		res.send(token);
			// 	}
			// );
			//res.send(jwttoken);
		} catch {
			(err) => console.log(err);
		}
	}
);

export default router;
