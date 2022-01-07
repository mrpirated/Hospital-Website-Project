import dbg from "debug";
const debug = dbg("data:getUnscheduledAppointment");
import connection from "../dbconn/db";

const getUnscheduledAppointment = (doctor_id) => {
	return new Promise((resolve, reject) => {
		connection.query(
			'SELECT appointment_id,\
		start_time,\
		end_time,\
		preferred_date\
		FROM appointment\
		WHERE state="pending"\
		AND doctor_id=?',
			[doctor_id],
			(err, result) => {
				if (err) {
					reject({ success: false, message: err });
				} else {
					debug(result);
					resolve({ success: true, data: { appointment: result } });
				}
			}
		);
	});
};
export default getUnscheduledAppointment;
