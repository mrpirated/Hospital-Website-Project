import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:admin/getAllDoctorInfo");
import getAllDoctorInfoService from "../../service/adminServices/getAllDoctorInfoService";
router.get("/getAllDoctorInfo", async (req, res) => {
	debug(req.query);
	await getAllDoctorInfoService(req.headers.authorization, req.query)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.message });
		});
});
export default router;
