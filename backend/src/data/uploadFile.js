import connection from "../dbconn/db";
import dbg from "debug";
const debug = dbg("data:uploadFile");

const uploadFile = (upload, req, res) => {
	return new Promise((resolve, reject) => {
		upload(req, res, (err) => {
			if (err) {
				reject({ success: false, message: err });
			} else {
				resolve({
					success: true,
					message: "File uploaded successfully",
					data: { file: req.file },
				});
			}
		});
	});
};
export default uploadFile;
