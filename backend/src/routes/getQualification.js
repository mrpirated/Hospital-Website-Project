import { Router } from "express";
const router = Router();
import getQualificationService from "../service/getQualificationService";
router.get("/getQualification", async (req, res) => {
	await getQualificationService(req.headers.authorization)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.msg });
		});
});
export default router;
