import { Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";
import rp from "request-promise";
import dotenv from "dotenv";
dotenv.config();
router.post("/newmeeting", (req, res) => {
	const email = "support@periwalmanavseva.com";
	const zoom_token = jwt.sign(
		{
			iss: process.env.ZOOM_API_KEY,
			exp: new Date().getTime() + 5000,
		},
		process.env.ZOOM_API_SECRET
	);
	var options = {
		method: "POST",
		uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
		body: {
			topic: "test create meeting",
			type: 1,
			settings: {
				join_before_host: true,
				mute_upon_entry: true,
			},
		},
		auth: {
			bearer: zoom_token,
		},
		headers: {
			"User-Agent": "Zoom-api-Jwt-Request",
			"content-type": "application/json",
		},
		json: true,
	};
	rp(options)
		.then((resp) => {
			//console.log(resp);
			res.send(JSON.stringify(resp));
		})
		.catch((err) => {
			console.log(err);
		});
});

export default router;
