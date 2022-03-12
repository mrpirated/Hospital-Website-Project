import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:removeDoctorQualificationAdmin");
import removeDoctorQualificationAdminService from "../service/removeDoctorQualificationAdminService";
router.post("/removeDoctorQualificationAdmin", async (req, res) => {
	await removeDoctorQualificationAdminService(
		req.headers.authorization,
		req.body
	)
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
