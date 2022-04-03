import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:admin/addUserDetails");
import addUserDetailsService from "../../service/adminServices/addUserDetailsService";
router.post("/addUserDetails", async (req, res) => {
	await addUserDetailsService(req.headers.authorization, req.body)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.message });
		});
});

export default router;
