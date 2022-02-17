import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:removeAvailability");

import removeAvailabilityService from "../service/removeAvailabilityService";
router.post("/removeAvailability", async (req, res) => {
	await removeAvailabilityService(req.headers.authorization, req.body)
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
