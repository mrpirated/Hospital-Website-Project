import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:getScheduledAppointments");
import getScheduledAppointmentsService from "../service/getScheduledAppointmentsService";
router.get("/getScheduledAppointments", async (req, res) => {
	await getScheduledAppointmentsService(req.headers.authorization)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.msg });
		});
});
export default router;
