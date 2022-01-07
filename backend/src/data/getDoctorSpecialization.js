import connection from "../dbconn/db";
import dbg from "debug";

const debug = dbg("data:getDoctorSpecialization");
const helper = (doctor_id) => {
	return new Promise((resolve, reject) => {
		connection.query(
			"SELECT\
            s.name\
            FROM\
            specialization s\
            LEFT JOIN doctor_specialization ds ON ds.specialization_id = s.specialization_id\
            WHERE\
            ds.doctor_id = ?\
          ",
			[doctor_id],
			(err, result) => {
				if (err) {
					reject({ success: false, message: err });
				} else {
					resolve({ success: true, data: { specialization: result } });
				}
			}
		);
	});
};
const getDoctorSpecialization = (doctor) => {
	return new Promise((resolve, reject) => {
		var alldocs = [];
		doctor.forEach((doc) => {
			var doctor_id = doc.doctor_id;
			alldocs.push(helper(doctor_id));
		});
		Promise.all(alldocs).then((response) => {
			//debug(response);
			var n = response.length;
			for (var i = 0; i < n; i++) {
				doctor[i].specialization = response[i].data.specialization;
			}
			resolve({
				success: true,
				message: "Doctors Returned Successfully",
				data: { doctor: doctor },
			});
		});
	});
};
export default getDoctorSpecialization;
