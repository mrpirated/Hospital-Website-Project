import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:forgotPassword");
import forgotPasswordService from "../service/forgotPasswordService";
router.post("/forgotPassword", async (req, res) => {
	await forgotPasswordService(req.body)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.message });
		});
});
export default router;
