import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:admin/getDoctorAppointmentDuration");
import getDoctorAppointmentDurationService from "../../service/adminServices/getDoctorAppointmentDurationService";
router.get("/getDoctorAppointmentDuration", async (req, res) => {
	debug(req.query);
	await getDoctorAppointmentDurationService(
		req.headers.authorization,
		req.query
	)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.message });
		});
});
export default router;
