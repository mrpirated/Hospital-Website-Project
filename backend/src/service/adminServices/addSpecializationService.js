import checkToken from "../../controllers/checkToken";
import dbg from "debug";
const debug = dbg("service:admin/addSpecialization");
import addDoctorSpecialization from "../../data/addDoctorSpecialization";
const addSpecializationService = async (
	token,
	{ specialization, doctor_id }
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
			return addDoctorSpecialization(doctor_id, specialization);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};
export default addSpecializationService;
