import axios from "axios";
import config from "../config/config.json";

const doctorAppointmentsAPI = async (data) => {
    const {token} = data;
    //console.log(token);
    return await axios
        .get(
            config.baseUrl + config.doctor + config.appointment + "?" + "token=" + token,
            {
                "token" : token,
            }
        ).then((res) => {
            if(res.status === 200) {
                console.log(res.data.msg);
                //console.log(res.data.cases);
                return {
                    reply: true,
                    appointments: res.data.appointments
                }
            }
            else if(res.status === 210) {
                console.log(res.data.msg);
				return {
					reply: false,
					data : res.data.msg.errors[0]
				}
			}
            else {
				console.log(res.data.msg);
				return {
					reply: false,
					data : res.data
				}
			}
        })
}
export default doctorAppointmentsAPI;