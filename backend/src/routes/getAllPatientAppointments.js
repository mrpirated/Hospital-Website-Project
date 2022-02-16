import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:getAllPatientAppointments");
import getAllPatientAppointmentsService from "../service/getAllPatientAppointmentsService";
router.get("/getAllPatientAppointments", async (req, res) => {
	await getAllPatientAppointmentsService(req.headers.authorization)
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
