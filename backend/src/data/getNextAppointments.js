import dbg from "debug";
const debug = dbg("data:getNextAppointments");
import pool from "../dbconn/db";

const getNextAppointments = () => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT\
                a.appointment_id,\
                a.start_time,\
                a.end_time,\
                c.patient_id,\
                a.doctor_id\
                FROM\
                appointment a\
                JOIN cases c ON c.case_id = a.case_id\
                WHERE\
                TIMEDIFF(start_time, NOW()) <= '00:01:00'\
                AND start_time >= NOW();\
                ",
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						resolve({
							success: true,
							message: "Appointments Found Successfully",
							data: { appointments: result },
						});
					}
				}
			);
			connection.release();
		});
	});
};
export default getNextAppointments;
