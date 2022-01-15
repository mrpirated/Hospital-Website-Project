import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:setDoctorAppointmentDuration");
import setDoctorAppointmentDurationService from "../service/setDoctorAppointmentDurationService";
router.post("/setDoctorAppointmentDuration", async (req, res) => {
	await setDoctorAppointmentDurationService(req.headers.authorization, req.body)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ success: false, message: err });
		});
});
export default router;
