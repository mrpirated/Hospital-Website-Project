import dbg from "debug";
const debug = dbg("data:getDoctors");
import connection from "../dbconn/db";

const getDoctors = () => {
	return new Promise((resolve, reject) => {
		connection.query(
			"SELECT doctor_id, first_name, last_name, dob, gender, address, email, phone FROM doctor",
			(err, result) => {
				if (err) {
					debug(err);
					reject({ success: false, message: err });
				} else {
					resolve({
						success: true,
						message: "Doctors Found Successfully",
						data: { doctors: result },
					});
				}
			}
		);
	});
};
export default getDoctors;
