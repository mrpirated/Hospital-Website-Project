import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:addQualificationAdmin");
import addQualificationAdminService from "../service/addQualificationAdminService";
router.post("/addQualification", async (req, res) => {
	await addQualificationAdminService(req.headers.authorization, req.body)
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
