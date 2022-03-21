import dbg from "debug";
const debug = dbg("service:getDoctorDaySlots");
import checkToken from "../controllers/checkToken";
import getDoctorDaySlots from "../data/getDoctorDaySlots";
const getDoctorDaySlotsService = async (token, { doctor_id, date }) => {
	return await checkToken(token)
		.then((response) => {
			// if (response.data.decoded.type !== "patient") {
			// 	return Promise.reject({ success: false, message: "Not Authorized" });
			// }
			return response.data.decoded;
		})
		.then((decoded) => {
			return getDoctorDaySlots(doctor_id, date);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};
export default getDoctorDaySlotsService;
