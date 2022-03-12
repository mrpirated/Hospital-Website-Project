import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:addQualification");
import addQualificationService from "../../service/adminServices/addQualificationService";
router.post("/addQualification", async (req, res) => {
	await addQualificationService(req.headers.authorization, req.body)
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
