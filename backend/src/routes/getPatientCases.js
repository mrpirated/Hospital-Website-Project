import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:getPatientCases");
import getPatientCasesService from "../service/getPatientCasesService";
router.get("/getPatientCases", async (req, res) => {
	await getPatientCasesService(req.query.token)
		.then((response) => {
			debug(response);
			if (response.success) {
				res.send({ message: response.message, data: response.data });
			} else {
				res.status(400).send({ message: response.message });
			}
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.message });
		});
});
export default router;
