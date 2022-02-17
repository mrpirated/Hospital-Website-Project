import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:getDoctorProfilePics");
import getDoctorProfilePicsService from "../service/getDoctorProfilePicsService";

router.get("/getDoctorProfilePics", async (req, res) => {
	getDoctorProfilePicsService(req.headers.authorization)
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
