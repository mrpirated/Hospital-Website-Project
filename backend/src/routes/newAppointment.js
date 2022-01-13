import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:newAppointment");
import newAppointmentService from "../service/newAppointmentService";
router.post("/newAppointment", async (req, res) => {
	await newAppointmentService(req.headers.authorization, req.body)
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
