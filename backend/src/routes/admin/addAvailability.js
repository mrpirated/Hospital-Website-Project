import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:admin/addAvailability");
import addAvailabilityService from "../../service/adminServices/addAvailabilityService";
router.post("/addAvailability", async (req, res) => {
	await addAvailabilityService(req.headers.authorization, req.body)
		.then((response) => {
			//debug(response);
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.message });
		});
});
export default router;
