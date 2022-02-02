import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:getDoctorAvailability");
import getDoctorAvailabilityService from "../service/getDoctorAvailabilityService";
router.get("/getDoctorAvailability", async (req, res) => {
	await getDoctorAvailabilityService(req.headers.authorization)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.message });
		});
});
export default router;
