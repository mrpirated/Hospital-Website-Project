import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:admin/removeDoctorSpecialization");
import removeDoctorSpecializationService from "../../service/adminServices/removeDoctorSpecializationService";
router.post("/removeDoctorSpecialization", async (req, res) => {
	await removeDoctorSpecializationService(req.headers.authorization, req.body)
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
