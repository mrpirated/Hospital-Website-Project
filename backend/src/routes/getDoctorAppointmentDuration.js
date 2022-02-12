import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:getDoctorAppointmentDuration");
import getDoctorAppointmentDurationService from "../service/getDoctorAppointmentDurationService";
router.get("/getDoctorAppointmentDuration", async (req, res) => {
	await getDoctorAppointmentDurationService(req.headers.authorization)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.message });
		});
});
export default router;
