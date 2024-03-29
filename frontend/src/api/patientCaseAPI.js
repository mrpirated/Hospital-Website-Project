import axios from "axios";
import config from "../config/config";

const patientCaseAPI = async (data) => {
	const { token } = data;
	console.log(token);
	return await axios
		.get(config.baseUrl + config.getPatientCases, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
		.then((res) => {
			// if (res.status === 200) {
			// 	console.log(res.data.msg);
			// 	//console.log(res.data.cases);
			// 	return {
			// 		reply: true,
			// 		cases: res.data.cases,
			// 	};
			// } else if (res.status === 210) {
			// 	console.log(res.data.msg);
			// 	return {
			// 		reply: false,
			// 		data: res.data,
			// 	};
			// } else {
			// 	console.log(res.data.msg);
			// 	return {
			// 		reply: false,
			// 		data: res.data,
			// 	};
			// }
			console.log(res.data);
			return res.data;
		});
};
export default patientCaseAPI;
