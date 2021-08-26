import { Router } from "express";
const router = Router();
import connection from "../dbconn/db";

router.get("/", async (req, res) => {
	try {
		connection.query("SHOW TABLES", (err, res, fields) => {
			if (err) console.log(err);
			else console.log(res);
		});
	} catch {
		(err) => {
			console.log(err);
		};
	}
});

export default router;
