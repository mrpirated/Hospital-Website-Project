import dbg from "debug";
const debug = dbg("service:getDoctorSpecialization");
import checkToken from "../controllers/checkToken";
import getDoctorSpecialization from "../data/getDoctorSpecialization";
const getDoctorSpecializationService = async (token) => {
	return await checkToken(token)
		.then((response) => {
			if (response.data.decoded.type !== "doctor") {
				return Promise.reject({ success: false, message: "Not Authorized" });
			} else return response.data.decoded;
		})
		.then((response) => {
			return getDoctorSpecialization(response.user_id);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};

export default getDoctorSpecializationService;
