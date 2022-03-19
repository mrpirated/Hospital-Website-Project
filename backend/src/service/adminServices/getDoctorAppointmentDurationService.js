import dbg from "debug";
const debug = dbg("service:forgotPasswordService");
import checkToken from "../../controllers/checkToken";
import getDoctorDuration from "../../data/getDoctorDuration";
const getDoctorAppointmentDurationService = async (token, { doctor_id }) => {
	return await checkToken(token)
		.then((response) => {
			if (response.data.decoded.type !== "admin") {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
			return getDoctorDuration(doctor_id);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};

export default getDoctorAppointmentDurationService;
