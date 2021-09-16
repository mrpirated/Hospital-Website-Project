import { Router } from "express";
const router = Router();
import connection from "../../dbconn/db";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import login_admin from "../../controllers/login_admin";
const bcrypt = require("bcrypt");

router.post(
	"/login_admin",
	[
		check("email", "Valid Email required").isEmail(),
		check("password", "Please enter a valid password").isLength({
			min: 6,
		}),
	],
	login_admin
);

export default router;
