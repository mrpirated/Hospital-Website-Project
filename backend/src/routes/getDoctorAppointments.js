import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:getDoctorAppointments");
import getDoctorAppointmentsService from "../service/getDoctorAppointmentsService";
router.get("/getDoctorAppointments", async (req, res) => {
	await getDoctorAppointmentsService(req.headers.authorization)
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
