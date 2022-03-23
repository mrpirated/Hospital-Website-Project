import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:newAppointmentSlot");
import newAppointmentSlotService from "../service/newAppointmentSlotService";
router.post("/newAppointmentSlot", async (req, res) => {
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
