import dbg from "debug";
const debug = dbg("service:admin/addAvailability");
import moment from "moment";
import checkToken from "../../controllers/checkToken";
import getSlots from "../../data/getSlots";
import divideAvailability from "../../controllers/divideAvailability";
import getDoctorDuration from "../../data/getDoctorDuration";
import divideSlots from "../../controllers/divideSlots";
import addSlots from "../../data/addSlots";
const addAvailabilityService = async (
	token,
	{ doctor_id, start_time, end_time }
) => {
	var slots;
	var newSlots;
	var duration;
	return await checkToken(token)
		.then((response) => {
			if (response.data.decoded.type !== "admin") {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
			return getSlots(doctor_id, moment(start_time).format("YYYY-MM-DD"));
		})
		.then((response) => {
			slots = response.data.slots;
			return divideAvailability(slots, start_time, end_time);
		})
		.then((response) => {
			newSlots = response.data.newSlots;
			debug(newSlots);
			return getDoctorDuration(doctor_id);
		})
		.then((response) => {
			duration = response.data.duration;
			return divideSlots(newSlots, duration);
		})
		.then((response) => {
			newSlots = response.data.newSlots;
			return addSlots(doctor_id, newSlots);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default addAvailabilityService;
