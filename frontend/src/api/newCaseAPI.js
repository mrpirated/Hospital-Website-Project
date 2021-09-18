import axios from "axios";
import config from "../config/config.json";

const newCaseAPI = (data) => {
    const {token} = data;

    return axios.post(
        config.baseUrl + config.patient + config.newcase,
        {
            token:token
        }
    ).then((res) => {
        if (res.status === 200) {
            //console.log(res.data);
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

export default newCaseAPI;