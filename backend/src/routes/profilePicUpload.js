import { Router } from "express";
const router = Router();

import dbg from "debug";
const debug = dbg("api:profilePicUpload");
import profilePicUploadService from "../service/profilePicUploadService";

router.post("/profilePicUpload", async (req, res) => {
	//debug(req);
	// debug(req.headers);
	// debug("form data", req.body);
	await profilePicUploadService(req, res)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send(err);
		});
	// upload.single("avatar")(req, {}, function (err) {
	// 	if (err) throw err;

	// 	// req.file, req.files...
	// });
});

export default router;
