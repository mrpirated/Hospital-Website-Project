import checkToken from "../controllers/checkToken";
import dbg from "debug";
const debug = dbg("service:addQualification");
import addDoctorQualification from "../data/addDoctorQualification";
const addQualificationService = async (token, { qualification }) => {
	return await checkToken(token)
		.then((response) => {
			if (response.success && response.data.decoded.type === "doctor") {
				return response.data.decoded;
			} else {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
		})
		.then((response) => {
			return addDoctorQualification(response.user_id, qualification);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};
export default addQualificationService;
