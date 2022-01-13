import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:getPatientAppointments");
import getPatientAppointmentsService from "../service/getPatientAppointmentsService";
router.get("/getPatientAppointments", async (req, res) => {
	await getPatientAppointmentsService(req.headers.authorization, req.query)
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
