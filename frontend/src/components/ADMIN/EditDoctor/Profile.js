import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setUpdateUser } from "../../../store/auth";
import { Form } from "react-bootstrap";
import { alertAdded } from "../../../store/alert";
import DateFnsUtils from "@date-io/date-fns";
import addUserDetailsAPI from "../../../api/adminAPI/addUserDetailsAPI";
import uploadProfilePicAPI from "../../../api/adminAPI/uploadProfilePicAPI";
import getAllDoctorInfoAPI from "../../../api/adminAPI/getAllDoctorInfoAPI";
import tokenAPI from "../../../api/tokenAPI";
import moment from "moment";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
function Profile(props) {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [dob, setDob] = useState();
	const [address, setAddress] = useState("");
	const [gender, setGender] = useState("");
	const [profilepic, setProfilepic] = useState();
	const { doctor_id } = props;
	useEffect(() => {
		getAllDoctorInfoAPI({ token: auth.token, doctor_id: doctor_id }).then(
			(response) => {
				console.log(response);
				if (response.success) {
					setFirstName(response.data.user.first_name);
					setLastName(response.data.user.last_name);
					setEmail(response.data.user.email);
					setGender(response.data.user.gender);
					setDob(response.data.user.dob);
					setAddress(response.data.user.address);
				}
			}
		);
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
			type: "doctor",
			user_id: doctor_id,
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
					//return tokenAPI(auth.token);
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
		if (profilepic) {
			var formdata = new FormData();
			formdata.append("avatar", profilepic);
			uploadProfilePicAPI({
				token: auth.token,
				formdata: formdata,
				doctor_id: doctor_id,
			}).then((res) => {
				console.log(res.message);
				props.setProfilePicChange(true);
			});
		}
	};
	const handleFileInput = (e) => {
		setProfilepic(e.target.files[0]);
	};
	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<div className='inprofile'>
					<h3 id='headerTitle'>Personal Information</h3>

					<div style={{ width: "100%", overflow: "hidden" }}>
						<div className='row'>
							<label>Change Profile Pic</label>
							<input type='file' onChange={handleFileInput} />
						</div>
						<div className='row' style={{ width: "50%", float: "left" }}>
							<label>First Name</label>
							<input
								type='text'
								value={first_name}
								// placeholder="Enter your First Name"
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div className='row' style={{ float: "right", width: "50%" }}>
							<label>Last Name</label>
							<input
								// placeholder="Enter your Last Name"
								type='text'
								value={last_name}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
					</div>
					<div className='row'>
						<label>Email</label>
						<input
							// placeholder="Enter your Last Name"

							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='row'>
						<label>Date Of Birth</label>
					</div>
					<div className='row'>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								style={{ width: "80%" }}
								variant='inline'
								inputVariant='outlined'
								format='dd/MM/yyyy'
								value={dob}
								onChange={(date) => setDob(date)}
								InputAdornmentProps={{ position: "start" }}
							/>
						</MuiPickersUtilsProvider>
					</div>
					<div className='row'>
						<label>Address</label>
						<input
							// placeholder="Enter your Last Name"
							type='text'
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</div>
					<div className='row'>
						<label>Gender</label>
						<select value={gender} onChange={(e) => setGender(e.target.value)}>
							<option value='Other'>Other</option>
							<option value='Male'>Male</option>
							<option value='Female'>Female</option>
						</select>
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

export default Profile;
