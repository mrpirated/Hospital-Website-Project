import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:addSpecialization");
import addSpecializationService from "../service/addSpecializationService";
router.post("/addSpecialization", async (req, res) => {
	await addSpecializationService(req.body)
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
