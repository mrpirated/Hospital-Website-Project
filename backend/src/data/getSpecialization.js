import dbg from "debug";
const debug = dbg("data:getSpecialization");
import pool from "../dbconn/db";

const getSpecialization = () => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query("SELECT * FROM specialization", (err, result) => {
				if (err) {
					reject({ success: false, message: err });
				} else {
					resolve({
						success: true,
						message: "Specialization received successfully",
						data: { specialization: result },
					});
				}
			});
			connection.release();
		});
	});
};
export default getSpecialization;
