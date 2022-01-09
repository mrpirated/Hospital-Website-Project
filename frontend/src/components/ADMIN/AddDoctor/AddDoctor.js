import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import "react-datepicker/dist/react-datepicker.css";
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import addDoctorAPI from "../../../api/addDoctorAPI";
import signupAPI from "../../../api/signupAPI";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-number-input";

function AddDoctor() {
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [dob, setDob] = useState(new Date());
	const [gender, setGender] = useState("PreferNotToSay");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [flag, setFlag] = useState(false);
	const history = useHistory();
	const auth = useSelector((state) => state.auth);
	const type = "doctor";
	const validateForm = () => {
		return first_name.length > 0 && email.length > 0 && password.length > 0;
	};

	const handleSubmit = (event) => {
		console.log(phone);
		event.preventDefault();
		if (validateForm() && password === confirmPassword) {
			setFlag(false);
			signupAPI({
				type: type,
				first_name,
				last_name,
				phone,
				email,
				password,
			}).then((res) => {
				console.log(res);
				if (res.success) {
					alert("Doctor Added Successfully!");
					history.push("/home");
				} else {
					alert(res.data.message);
				}
			});
		} else if (password !== confirmPassword) {
			setFlag(true);
		}
	};

	return (
		<div
			className='addDoctorForm'
			style={{ backgroundColor: "#D3E0EA", paddingBottom: "20px"}}
		>
			<Form onSubmit={handleSubmit}>
				<div>
					<h2 id='headerTitle'>Enter Details of Doctor</h2>
					<div style={{ width: "100%", overflow: "hidden" }}>
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
						<label>Phone Number</label>
						<PhoneInput
							// placeholder="Enter phone number"
							defaultCountry='IN'
							value={phone}
							style={{ width: "85%" }}
							onChange={setPhone}
						/>
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
						<label>Password</label>
						<input
							// placeholder="Enter your Last Name"
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className='row'>
						<label>Confirm Password</label>
						<input
							// placeholder="Enter your Last Name"
							type='password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					{/* <Form.Group size='lg'>
							<Form.Label>Date Of Birth</Form.Label>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									autoOk
									variant="inline"
									inputVariant="outlined"
									format="dd/MM/yyyy"
									value={dob}
									onChange={(date) => setDob(date)}
									InputAdornmentProps={{ position: "start" }}
								/>
							</MuiPickersUtilsProvider>
							
							{/* <DatePicker selected={dob} onChange={(date) => setDob(date)} />
						</Form.Group>
						<Form.Group size='lg'>
							<Form.Label>Gender</Form.Label>
							<Form.Control
								as='select'
								custom
								onChange={(e) => setGender(e.target.value)}
							>
								<option value='PreferNotToSay'>Prefer Not To Say</option>
								<option value='Male'>Male</option>
								<option value='Female'>Female</option>
							</Form.Control>
						</Form.Group>
						<Form.Group size='lg'>
							<Form.Label>Address</Form.Label>
							<Form.Control
								type='text'
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</Form.Group>
						<Form.Group size='lg'>
							<Form.Label>Phone</Form.Label>
							<Form.Control
								type='text'
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</Form.Group> */}
					<div id='button' class='row'>
						<button style={{ width: "45%", fontSize: "15px" }} type='submit'>
							Submit
						</button>
					</div>
				</div>
			</Form>
		</div>
	);
}

export default AddDoctor;
