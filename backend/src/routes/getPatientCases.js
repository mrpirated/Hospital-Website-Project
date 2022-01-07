import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:getPatientCases");
import getPatientCasesService from "../service/getPatientCasesService";
router.get("/getPatientCases", async (req, res) => {
	await getPatientCasesService(req.body.token)
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
