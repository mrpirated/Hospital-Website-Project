import { Router } from "express";
const router = Router();
import { check, validationResult } from "express-validator";
import connection from "../../dbconn/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import signup_admin from "../../controllers/signup_admin";
dotenv.config();
const bcrypt = require("bcrypt");
router.post(
	"/signup_admin",
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
	signup_admin
);

export default router;
