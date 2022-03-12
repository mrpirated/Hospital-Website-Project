import checkToken from "../../controllers/checkToken";
import dbg from "debug";
const debug = dbg("service:admin/removeDoctorSpecialization");
import removeDoctorSpecialization from "../../data/removeDoctorSpecialization";
const removeDoctorSpecializationService = async (
	token,
	{ specialization_id, doctor_id }
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
			return removeDoctorSpecialization(doctor_id, specialization_id);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};
export default removeDoctorSpecializationService;
