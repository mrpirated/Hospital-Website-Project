import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:verifyPhone");
import verifyPhoneService from "../service/verifyPhoneService";
router.post("/verifyPhone", async (req, res) => {
	await verifyPhoneService(req.headers.authorization, req.body)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.message });
		});
});
export default router;
