import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../../store/auth";
import { Form } from "react-bootstrap";
import DateFnsUtils from "@date-io/date-fns";
import addUserDetailsAPI from "../../../api/addUserDetailsAPI";
import uploadProfilePicAPI from "../../../api/uploadProfilePicAPI";
import getProfilePicAPI from "../../../api/getProfilePicAPI";
import moment from "moment";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
function ProfileInfo(props) {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [dob, setDob] = useState();
	const [address, setAddress] = useState("");
	const [gender, setGender] = useState("");
	const [profilepic, setProfilepic] = useState();
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
		console.log(first_name);
		console.log(last_name);
		console.log(email);
		console.log(gender);
		console.log(address);
		console.log(dob);
		var data = {
			token: auth.token,
			first_name,
			last_name,
			dob: dob ? moment(dob).format("YYYY-MM-DD") : dob,
			gender,
			address,
			email,
		};
		addUserDetailsAPI(data).then((response) => {
			// alert(response.message);
			dispatch(setLoading({ loading: false }));
		});
		if (profilepic) {
			var formdata = new FormData();
			formdata.append("avatar", profilepic);
			uploadProfilePicAPI({ token: auth.token, formdata: formdata }).then(
				(res) => {
					console.log(res.message);
					props.setProfilePicChange(true);
				}
			);
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

export default ProfileInfo;