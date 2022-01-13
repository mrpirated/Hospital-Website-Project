import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:newCase");
import newCaseService from "../service/newCaseService";
router.post("/newCase", async (req, res) => {
	await newCaseService(req.headers.authorization, req.body)
		.then((response) => {
			debug(response);
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.message });
		});
});
export default router;
