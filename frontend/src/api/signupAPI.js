import axios from 'axios';
import config from '../config/config.json';

const signupAPI = (data) => {
    const { first_name, last_name, dob, gender, address, email, phone, password } = data;
    axios.post(config.baseUrl + config.signup, {
        first_name,
        last_name,
        dob,
        gender,
        address,
        email,
        phone,
        password
    }).then((res) => {
        if (res.status === 200) {
            console.log(res.data);
        }
    }).catch();
}

export default signupAPI;