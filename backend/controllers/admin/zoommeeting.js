import jwt from "jsonwebtoken";
import rp from "request-promise";
import dotenv from "dotenv";
dotenv.config();

const zoommeeting = async () => {
	const email = "deepeshrathi9@gmail.com";
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
				host_video: "true",
				participant_video: "true",
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
	return rp(options)
		.then((resp) => {
			//console.log(resp);
			return resp;
		})
		.catch((err) => {
			console.log(err);
		});
};

export default zoommeeting;
