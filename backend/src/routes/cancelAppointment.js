import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:cancelAppointment");
import cancelAppointmentService from "../service/cancelAppointmentService";
router.post("/cancelAppointment", async (req, res) => {
	await cancelAppointmentService(req.headers.authorization, req.body)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.message });
		});
});

export default router;
