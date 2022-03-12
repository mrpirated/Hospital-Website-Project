import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:admin/removeDoctorQualification");
import removeDoctorQualificationService from "../../service/adminServices/removeDoctorQualificationService";
router.post("/removeDoctorQualification", async (req, res) => {
	await removeDoctorQualificationService(req.headers.authorization, req.body)
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
