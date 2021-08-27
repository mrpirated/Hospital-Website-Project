import { Router } from "express";
const router = Router();
import { check, validationResult } from "express-validator";
import connection from "../../dbconn/db";
const bcrypt = require("bcrypt");
router.post("/signup", [
	check("first_name", "Name is required").not().isEmpty(),
	//check("first_name", "Name is required").not().isEmpty(),
	check("email", "Valid Email required").isEmail(),
	check(
		"password",
		"Please enter a password with 6 or more characters"
	).isLength({
		min: 6,
	}),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res
				.status(ErrorCode.HTTP_BAD_REQ)
				.json({ errors: errors.array() });
		}
		//console.log(req);
		//signup;
		// const salt = await bcrypt.genSalt(10);
		// const hashedPassword = await bcrypt.hash(req.password, salt);
		try {
			bcrypt.hash(req.password, 10, (err, hash) => {
				req.body.password = hash;
			});
			//req.password = hashedPassword;
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
			console.log(value);
			var q = await connection.query(
				"INSERT INTO patient SET ?",
				value,
				(err, results, fields) => {
					//console.log("jere");
					if (err) console.log(err);
					else {
						console.log(results);
					}
				}
			);
			//console.log(q.sql);
		} catch {
			(err) => console.log(err);
		}
	},
]);

export default router;
