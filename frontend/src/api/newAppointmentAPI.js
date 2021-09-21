import axios from "axios";
import config from "../config/config.json";

const newAppointmentAPI = async(data) => {
    const {token, case_id, doctor_id, start_time, end_time} = data;

    return await axios.post(
        config.baseUrl + config.patient + config.newappointment,
        {
            token:token,
            case_id: case_id,
            doctor_id: doctor_id,
            start_time: start_time,
            end_time: end_time
        }
    ).then((res) => {
        if (res.status === 200) {
            console.log(res.data);
            //return res.data;
            return {
                reply: true,
                data: res.data
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
    }).catch();
}

export default newAppointmentAPI;