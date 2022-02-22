import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:verifyEmail");
import verifyEmailService from "../service/verifyEmailService";
router.post("/verifyEmail", async (req, res) => {
	await verifyEmailService(req.headers.authorization, req.body)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.message });
		});
});
export default router;
