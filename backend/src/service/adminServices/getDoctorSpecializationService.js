import dbg from "debug";
const debug = dbg("service:admin/getDoctorSpecialization");
import checkToken from "../../controllers/checkToken";
import getDoctorSpecialization from "../../data/getDoctorSpecialization";
const getDoctorSpecializationService = async (token, { doctor_id }) => {
	return await checkToken(token)
		.then((response) => {
			if (response.data.decoded.type !== "admin") {
				return Promise.reject({ success: false, message: "Not Authorized" });
			} else return response.data.decoded;
		})
		.then((response) => {
			return getDoctorSpecialization(doctor_id);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};

export default getDoctorSpecializationService;
