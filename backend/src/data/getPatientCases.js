import dbg from "debug";
const debug = dbg("data:getPatientCases");
import connection from "../dbconn/db";
const getPatientCases = (user_id) => {
	return new Promise((resolve, reject) => {
		connection.query(
			"SELECT c.case_id,\
        c.case_description\
        FROM cases c\
        LEFT JOIN appointment a\
        ON c.case_id = a.case_id \
        WHERE c.patient_id = ? \
        GROUP BY c.case_id ORDER \
        BY a.start_time DESC",
			[user_id],
			(err, result) => {
				if (err) {
					debug(err);
					reject({ success: false, message: err });
				} else {
					resolve({
						success: true,
						message: "Cases Found Successfully",
						data: { cases: result },
					});
				}
			}
		);
	});
};
export default getPatientCases;
