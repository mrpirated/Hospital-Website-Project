import checkToken from "../../controllers/checkToken";
import dbg from "debug";
const debug = dbg("service:addQualification");
import addDoctorQualification from "../../data/addDoctorQualification";
const addQualificationService = async (token, { qualification, doctor_id }) => {
	return await checkToken(token)
		.then((response) => {
			if (response.success && response.data.decoded.type === "admin") {
				return response.data.decoded;
			} else {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
		})
		.then((response) => {
			return addDoctorQualification(doctor_id, qualification);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};
export default addQualificationService;
