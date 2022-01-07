import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:setAvailability");
import setAvailabilityService from "../service/setAvailabilityService";
router.post("/setAvailability", async (req, res) => {
	debug(req.body);
	await setAvailabilityService(req.body)
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
