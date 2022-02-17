import dbg from "debug";
const debug = dbg("service:removeAvailability");
import checkToken from "../controllers/checkToken";

const removeAvailabilityService = async (token, { start_time, end_time }) => {
	return await checkAvailability(token)
		.then((response) => {})
		.catch((err) => {
			debug(err);
			return err;
		});
};

export default removeAvailabilityService;
