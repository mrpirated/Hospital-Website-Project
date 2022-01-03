import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:getDoctors");
import getDoctorsService from "../service/getDoctorsService";
router.get("/getDoctors", async (req, res) => {
	await getDoctorsService(req.query.token)
		.then((response) => {
			//debug(response);
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
