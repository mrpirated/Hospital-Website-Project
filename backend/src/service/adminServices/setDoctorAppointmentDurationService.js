import dbg from "debug";
const debug = dbg("service:admin/setDoctorAppointmentDuration");
import checkToken from "../../controllers/checkToken";
import setDoctorAppointmentDuration from "../../data/setDoctorAppointmentDuration";
const setDoctorAppointmentDurationService = async (
	token,
	{ doctor_id, duration }
) => {
	return await checkToken(token)
		.then((response) => {
			if (response.data.decoded.type !== "admin") {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
			return setDoctorAppointmentDuration(doctor_id, duration);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};

export default setDoctorAppointmentDurationService;
