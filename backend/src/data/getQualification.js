import dbg from "debug";
const debug = dbg("data:getQualification");
import pool from "../dbconn/db";

const getQualification = () => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query("SELECT * FROM qualification", (err, result) => {
				if (err) {
					reject({ success: false, message: err });
				} else {
					resolve({
						success: true,
						message: "Qualification received successfully",
						data: { qualification: result },
					});
				}
			});
			connection.release();
		});
	});
};
export default getQualification;
