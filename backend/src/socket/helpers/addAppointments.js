import dbg from "debug";
const debug = dbg("socket:addAppointments");
import getNextAppointments from "../../data/getNextAppointments";
const addAppointments = async (currentAppointments) => {
	return await getNextAppointments(false).then((response) => {
		if (response.success) {
			//debug(response.data.appointments);
			if (response.data.appointments.length > 0) {
				response.data.appointments.map((ap) => {
					currentAppointments.push({
						appointment_id: ap.appointment_id,
						patient_id: ap.patient_id,
						doctor_id: ap.doctor_id,
						start_time: ap.start_time,
						end_time: ap.end_time,
						patient_socketId: null,
						doctor_socketId: null,
					});
				});
			}
		}
	});
};
export default addAppointments;
