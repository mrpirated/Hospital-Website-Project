import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:getPatientAppointments");
import getDoctorQualificationAdminService from "../service/getDoctorQualificationAdminService";
router.get("/getDoctorQualificationAdmin", async (req, res) => {
	await getDoctorQualificationAdminService(req.headers.authorization, req.query)
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
