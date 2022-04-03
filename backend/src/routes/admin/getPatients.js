import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:admin/getPatients");
import getPatientsService from "../../service/adminServices/getPatientsService";
router.get("/getPatients", async (req, res) => {
	//debug(req.query);
	await getPatientsService(req.headers.authorization)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.msg });
		});
});
export default router;
