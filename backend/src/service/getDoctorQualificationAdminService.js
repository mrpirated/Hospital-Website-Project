import dbg from "debug";
const debug = dbg("service:getDoctorQualification");
import checkToken from "../controllers/checkToken";
import getDoctorQualification from "../data/getDoctorQualification";
const getDoctorQualificationAdminService = async (token, { doctor_id }) => {
	return await checkToken(token)
		.then((response) => {
			if (response.data.decoded.type !== "admin") {
				return Promise.reject({ success: false, message: "Not Authorized" });
			} else return response.data.decoded;
		})
		.then((response) => {
			return getDoctorQualification(doctor_id);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};

export default getDoctorQualificationAdminService;
