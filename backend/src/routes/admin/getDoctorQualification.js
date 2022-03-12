import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:getPatientAppointments");
import getDoctorQualificationService from "../../service/adminServices/getDoctorQualificationService";
router.get("/getDoctorQualification", async (req, res) => {
	await getDoctorQualificationService(req.headers.authorization, req.query)
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
