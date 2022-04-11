import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:getUserName");
import getUserNameService from "../service/getUserNameService";
router.get("/getUserName", async (req, res) => {
	await getUserNameService(req.headers.authorization)
		.then((response) => {
			debug(response);
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.message });
		});
});
export default router;
