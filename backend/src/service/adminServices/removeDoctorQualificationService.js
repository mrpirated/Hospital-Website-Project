import checkToken from "../../controllers/checkToken";
import dbg from "debug";
const debug = dbg("service:admin/removeDoctorQualification");
import removeDoctorQualification from "../../data/removeDoctorQualification";
const removeDoctorQualificationService = async (
	token,
	{ qualification_id, doctor_id }
) => {
	return await checkToken(token)
		.then((response) => {
			if (response.success && response.data.decoded.type === "admin") {
				return response.data.decoded;
			} else {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
		})
		.then((response) => {
			return removeDoctorQualification(doctor_id, qualification_id);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};
export default removeDoctorQualificationService;
