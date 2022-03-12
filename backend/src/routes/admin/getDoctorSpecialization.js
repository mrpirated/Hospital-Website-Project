import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:admin/getDoctorSpecialization");
import getDoctorSpecializationService from "../../service/adminServices/getDoctorSpecializationService";
router.get("/getDoctorSpecialization", async (req, res) => {
	await getDoctorSpecializationService(req.headers.authorization, req.query)
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
