import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:getPatientAppointments");
import getDoctorSpecializationService from "../service/getDoctorSpecializationService";
router.get("/getDoctorSpecialization", async (req, res) => {
	await getDoctorSpecializationService(req.headers.authorization)
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
