import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:getProfilePic");
import getProfilePicService from "../service/getProfilePicService";
router.get("/getProfilePic", async (req, res) => {
	await getProfilePicService(req.headers.authorization)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.msg });
		});
});
export default router;
