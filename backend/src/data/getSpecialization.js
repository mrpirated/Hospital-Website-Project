import dbg from "debug";
const debug = dbg("data:getSpecialization");
import connection from "../dbconn/db";

const getSpecialization = () => {
	return new Promise((resolve, reject) => {
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
	});
};
export default getSpecialization;
