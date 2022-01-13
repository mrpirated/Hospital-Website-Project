import dbg from "debug";
const debug = dbg("service:profilePicUpload");
import checkToken from "../controllers/checkToken";
import multer from "multer";
import fs from "fs";
const profilePicUploadService = async (req, res) => {
	return await checkToken(req.headers.token)
		.then((response) => {
			if (response.success) {
				debug(response);
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
								"_" +
								Date.now().toString() +
								".jpg"
						);
					},
				});
				var upload = multer({ storage: storage });
				//debug(upload.storage.getFilename());
				upload.single("avatar")(req, res, (err) => {
					if (err) {
						return Promise.reject({ success: false, message: err });
					}
				});
			}
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default profilePicUploadService;
