import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:getDoctors");
import getDoctorsService from "../service/getDoctorsService";
router.get("/getDoctors", async (req, res) => {
	await getDoctorsService(req.body.token)
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
