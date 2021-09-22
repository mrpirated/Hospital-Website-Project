import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import signupAPI from "../../../api/signupAPI";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";
import "./Signup.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Signup(props) {
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
	const validateForm = () => {
		return (
			first_name.length > 0 &&
			email.length > 0 &&
			phone.length === 10 &&
			password.length > 0
		);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (validateForm() && password === confirmPassword) {
			setFlag(false);
			signupAPI({
				first_name,
				last_name,
				dob,
				gender,
				address,
				email,
				phone,
				password,
			}).then((res) => {
				if(res.reply){
					history.push("/home");
				}
				else{
					alert(res.data.msg);
				}
			});
		} else if (password !== confirmPassword) {
			setFlag(true);
		}
	};

	return (
		<div>
			<div className='Signup'>
				<Form onSubmit={handleSubmit}>
					<Row>
						<Form.Group as={Col}>
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type='text'
								value={first_name}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type='text'
								value={last_name}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</Form.Group>
					</Row>
					<Form.Group size='lg' controlId='email'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							autoFocus
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size='lg' controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size='lg' controlId='password'>
						<Form.Label>
							Confirm Password
							{flag ? "*Password and Confirm Password should match" : ""}
						</Form.Label>
						<Form.Control
							type='password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size='lg'>
						<Form.Label>Date Of Birth</Form.Label>
						<DatePicker selected={dob} onChange={(date) => setDob(date)} />
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
					</Form.Group>
					<Button block size='lg' type='submit' disabled={!validateForm()}>
						Signup
					</Button>
				</Form>
			</div>
		</div>
	);
}

export default Signup;
