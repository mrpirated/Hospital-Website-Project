import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:getProfilePicAdmin");
import getProfilePicAdminService from "../service/getProfilePicAdminService";
router.get("/getProfilePicAdmin", async (req, res) => {
	debug(req.query);
	await getProfilePicAdminService(req.headers.authorization, req.query)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.msg });
		});
});
export default router;
