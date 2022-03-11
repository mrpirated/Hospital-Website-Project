import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setUpdateUser } from "../../../store/auth";
import { alertAdded } from "../../../store/alert";
import { Form } from "react-bootstrap";
import DateFnsUtils from "@date-io/date-fns";
import addUserDetailsAPI from "../../../api/addUserDetailsAPI";
import tokenAPI from "../../../api/tokenAPI";
import moment from "moment";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
function ProfileInfo() {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [dob, setDob] = useState();
	const [address, setAddress] = useState("");
	const [gender, setGender] = useState("Other");
	useEffect(() => {
		setFirstName(auth.user.first_name);
		setLastName(auth.user.last_name);
		setEmail(auth.user.email);
		setGender(auth.user.gender);
		setDob(auth.user.dob);
		setAddress(auth.user.address);
	}, [auth.user]);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(setLoading({ loading: true }));

		var data = {
			token: auth.token,
			first_name,
			last_name,
			dob: dob ? moment(dob).format("YYYY-MM-DD") : dob,
			gender,
			address,
			email,
		};
		addUserDetailsAPI(data)
			.then((response) => {
				// alert(response.message);

				if (response.success) {
					dispatch(
						alertAdded({ variant: "success", message: response.message })
					);
					dispatch(setUpdateUser());
					dispatch(alertAdded({ variant: "success", message: "User Updated" }));
				} else return Promise.reject(response);
			})
			// .then((response) => {
			// 	if (response.success) {
			// 		dispatch(userUpdated({ user: response.data.user }));
			// 		dispatch(alertAdded({ variant: "success", message: "User Updated" }));
			// 	} else return Promise.reject(response);
			// })
			.catch((err) => {
				dispatch(alertAdded({ variant: "danger", message: err.message }));
				console.log(err);
			})
			.finally(() => {
				dispatch(setLoading({ loading: false }));
			});
	};
	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<div className='inprofile'>
					<h3 id='headerTitle'>Personal Information</h3>

					<div className='row'>
						<label>Email</label>
						<input
							// placeholder="Enter your Last Name"

							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div id='button' className='row'>
						<button style={{ width: "45%", fontSize: "15px" }} type='submit'>
							Save
						</button>
					</div>
				</div>
			</Form>
		</div>
	);
}

export default ProfileInfo;
