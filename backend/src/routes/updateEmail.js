import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:updateEmail");
import updateEmailService from "../service/updateEmailService";
router.post("/updateEmail", async (req, res) => {
	await updateEmailService(req.headers.authorization, req.body)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.message });
		});
});
export default router;
