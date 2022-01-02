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
			if (response.success) {
				res.send({ message: "Availability set successfully" });
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
