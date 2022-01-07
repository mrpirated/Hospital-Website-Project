import { Router } from "express";
const router = Router();
import getSpecializationService from "../service/getSpecializationService";
router.get("/getSpecialization", async (req, res) => {
	await getSpecializationService(req.body.token)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.msg });
		});
});
export default router;
