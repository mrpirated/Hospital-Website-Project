import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:changePassword");
import changePasswordService from "../service/changePasswordService";
router.post("/changePassword", async (req, res) => {
	await changePasswordService(req.headers.authorization, req.body)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.message });
		});
});

export default router;
