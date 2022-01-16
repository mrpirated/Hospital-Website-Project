import dbg from "debug";
const debug = dbg("controller:getDoctorProfilePic");

import getProfilePic from "./getProfilePic";

const getDoctorProfilePic = (doctors) => {
	return new Promise((resolve, reject) => {
		var promises = [];
		doctors.forEach((d) => {
			promises.push(getProfilePic(d.profile_pic));
		});
		Promise.all(promises).then((response) => {
			var n = response.length;
			for (var i = 0; i < n; i++) {
				if (response[i].success) {
					doctors[i].image = response[i].data.image;
				}
			}
			resolve({
				success: true,
				message: "got images",
				data: { doctor: doctors },
			});
		});
	});
};

export default getDoctorProfilePic;
