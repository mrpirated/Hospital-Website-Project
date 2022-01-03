import dbg from "debug";
const debug = dbg("service:setAvailability");
import checkToken from "../controllers/checkToken";
import getSchedule from "../data/getSchedule";
import mergeAvailability from "../controllers/mergeAvailability";
import setAvailability from "../data/setAvailability";
const setAvailabilityService = async ({ token, start_time, end_time }) => {
	start_time = new Date(start_time);
	end_time = new Date(end_time);
	debug(start_time, end_time);
	var user_id;
	return await checkToken(token)
		.then((response) => {
			//debug(response);
			if (response.success && response.data.decoded.type === "doctor") {
				return response.data.decoded;
			} else {
				if (response.success) {
					return Promise.reject({
						success: false,
						message: "User Not Authorized",
					});
				} else {
					return Promise.reject(response);
				}
			}
		})
		.then((decoded) => {
			user_id = decoded.user_id;
			return getSchedule(decoded.user_id, new Date.now());
		})
		.then((response) => {
			debug(response.data.schedule);
			return mergeAvailability(response.data.schedule, start_time, end_time);
		})
		.then((response) => {
			//debug(user_id);
			debug(response.data);
			return setAvailability(user_id, response.data);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default setAvailabilityService;
