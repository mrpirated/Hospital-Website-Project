import dbg from "debug";
const debug = dbg("service:admin/getAllDoctorInfo");
import checkToken from "../../controllers/checkToken";
import getAllDoctorInfo from "../../data/getAllDoctorInfo";
const getAllDoctorInfoService = async (token, { doctor_id }) => {
	return await checkToken(token)
		.then((response) => {
			if (response.data.decoded.type !== "admin") {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
			return getAllDoctorInfo(doctor_id);
		})
		.catch((error) => {
			debug(error);
			return error;
		});
};

export default getAllDoctorInfoService;
