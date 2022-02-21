import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:rescheduleAppointment");
import rescheduleAppointmentService from "../service/rescheduleAppointmentService";
router.post("/rescheduleAppointment", async (req, res) => {
	await rescheduleAppointmentService(req.headers.authorization, req.body)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.message });
		});
});

export default router;
