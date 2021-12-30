import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:signup");
import signupService from "../service/signupService";
router.post("/signup", async (req, res) => {
	await signupService(req.body)
		.then((response) => {
			//debug(response);
			if (response.success) {
				res.send({
					messsage: response.message,
					data: response.data,
				});
			} else {
				res.status(403).send({ message: response.message });
			}
		})
		.catch((err) => {
			debug(err);
		});
});
export default router;
