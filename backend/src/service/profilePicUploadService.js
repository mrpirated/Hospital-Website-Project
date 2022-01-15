import dbg from "debug";
const debug = dbg("service:profilePicUpload");
import checkToken from "../controllers/checkToken";
import multer from "multer";
import fs from "fs";
import setProfilePicPath from "../data/setProfilePicPath";
import uploadFile from "../data/uploadFile";
const profilePicUploadService = async (req, res) => {
	var type, user_id;
	return await checkToken(req.headers.authorization)
		.then((response) => {
			if (response.success) {
				debug(response);
				type = response.data.decoded.type;
				user_id = response.data.decoded.user_id;
				if (type !== "doctor") {
					return Promise.reject({
						success: false,
						message: "Profile pic feature not available for " + type,
					});
				}
				var storage = multer.diskStorage({
					destination: function (req, file, cb) {
						const path = "./uploads/ProfilePics";
						fs.mkdirSync(path, { recursive: true });
						cb(null, path);
					},
					filename: function (req, file, cb) {
						//debug(req.body);
						cb(
							null,
							response.data.decoded.type +
								"_profile_pic_" +
								response.data.decoded.user_id +
								".jpg"
						);
					},
				});
				//return storage;
				var upload = multer({ storage: storage }).single("avatar");
				return uploadFile(upload, req, res);
				//debug(upload.storage.getFilename());
			}
		})
		.then((response) => {
			debug(response);
			return setProfilePicPath(type, response.data.file.filename, user_id);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default profilePicUploadService;
