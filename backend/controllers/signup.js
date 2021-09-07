import { Router } from "express";
import connection from "../dbconn/db";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
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

			connection.query("SELECT * FROM patient WHERE email = ?", value.email, async (err, result) => {
				if (result[0]) {
					return res.status(409).send({
						msg: 'This username is already in use!'
					});
				}
				else {
					value.password = await bcrypt.hash(req.body.password, 10);

					console.log(value.password);
					var patient_id;
					var q = connection.query(
						"INSERT INTO patient SET ?",
						value,
						(err, result, fields) => {
							if (err) {
								throw err;
								return res.status(400).send({
									msg: err
								});
							}
							return res.status(200).send({
								msg: 'Registered!'
							});
							/*//console.log("jere");
							if (err) console.log(err);
							else {
								patient_id = results.insertId;
								//console.log(patient_id);
								//console.log(t);
							}*/
						}
					);
				}
			})

			
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

export default signup;
