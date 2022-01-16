import dbg from "debug";
const debug = dbg("controller:getProfilePic");
import fs from "fs";
import path from "path";
const getProfilePic = (filename) => {
	return new Promise((resolve, reject) => {
		//var filename = type + "_profile_pic_" + id + ".jpg";
		debug(filename);
		if (fs.existsSync(path.resolve("uploads/ProfilePics/" + filename))) {
			resolve({
				success: true,
				message: "image found",
				data: {
					image: fs.readFileSync(
						path.resolve("uploads/ProfilePics/" + filename)
					),
				},
			});
		} else resolve({ success: false, message: "Image not found" });
	});
};
export default getProfilePic;
