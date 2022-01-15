import dbg from "debug";
const debug = dbg("service:setAvailability");
import checkToken from "../controllers/checkToken";
import setDoctorAppointmentDuration from "../data/setDoctorAppointmentDuration";
const setDoctorAppointmentDurationService = async (token, { duration }) => {
	return await checkToken(token)
		.then((response) => {
			if (response.data.decoded.type !== "doctor") {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
			return setDoctorAppointmentDuration(
				response.data.decoded.user_id,
				duration
			);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};

export default setDoctorAppointmentDurationService;
