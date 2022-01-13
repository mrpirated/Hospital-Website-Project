import checkToken from "../controllers/checkToken";
import dbg from "debug";
const debug = dbg("service:addSpecialization");
import addDoctorSpecialization from "../data/addDoctorSpecialization";
const addSpecializationService = async (token, { specialization }) => {
	return await checkToken(token)
		.then((response) => {
			if (response.success && response.data.decoded.type === "doctor") {
				return response.data.decoded;
			} else {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
		})
		.then((response) => {
			return addDoctorSpecialization(response.user_id, specialization);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};
export default addSpecializationService;
