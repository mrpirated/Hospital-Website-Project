import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:admin/getProfilePicAdmin");
import getProfilePicService from "../../service/adminServices/getProfilePicService";
router.get("/getProfilePic", async (req, res) => {
	debug(req.query);
	await getProfilePicService(req.headers.authorization, req.query)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.msg });
		});
});
export default router;
