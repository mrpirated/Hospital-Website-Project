import dbg from "debug";
const debug = dbg("service:newAppointment");
import checkToken from "../controllers/checkToken";
import getSchedule from "../data/getSchedule";
const newAppointmentService = async ({
	token,
	doctor_id,
	preferred_date,
	case_id,
}) => {
	return await checkToken(token)
		.then((response) => {
			if (response.success && response.data.decoded.type === "patient") {
				return response.data.decoded;
			} else {
				if (response.success) {
					return Promise.reject({ success: false, message: "Not Authorized" });
				} else return Promise.reject(response);
			}
		})
		.then((decoded) => {
			return getSchedule(doctor_id, preferred_date);
		})
		.then((response) => {
			debug(response);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default newAppointmentService;
