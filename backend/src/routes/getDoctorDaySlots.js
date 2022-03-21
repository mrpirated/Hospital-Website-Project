import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:getDoctorDaySlots");
import getDoctorDaySlotsService from "../service/getDoctorDaySlotsService";

router.get("/getDoctorDaySlots", async (req, res) => {
	getDoctorDaySlotsService(req.headers.authorization, req.query)
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
