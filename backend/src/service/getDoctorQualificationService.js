import dbg from "debug";
const debug = dbg("service:getDoctorQualification");
import checkToken from "../controllers/checkToken";
import getDoctorQualification from "../data/getDoctorQualification";
const getDoctorQualificationService = async (token) => {
	return await checkToken(token)
		.then((response) => {
			if (response.data.decoded.type !== "doctor") {
				return Promise.reject({ success: false, message: "Not Authorized" });
			} else return response.data.decoded;
		})
		.then((response) => {
			return getDoctorQualification(response.user_id);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};

export default getDoctorQualificationService;
