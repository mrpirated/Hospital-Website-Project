import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:newCase");
import newCaseService from "../service/newCaseService";
router.post("/newCase", async (req, res) => {
	await newCaseService(req.body)
		.then((response) => {
			debug(response);
			if (response.success) {
				res.send({ message: "Case Created Successfully" });
			} else {
				res.status(400).send({ message: response.message });
			}
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.message });
		});
});
export default router;
