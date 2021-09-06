import React, {useState} from "react";
import { Form, Row, Col } from "react-bootstrap";
import signupAPI from "../../api/signupAPI";
import Button from "react-bootstrap/Button";
import "./Signup.css";

function Signup(props) {
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [dob, setDob] = useState(undefined);
	const [gender, setGender] = useState("None");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const validateForm = () => {
		return (first_name.length > 0 && email.length > 0 && phone.length === 10 && password.length > 0);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		//signupAPI({ first_name, last_name, dob, gender, address, email, phone, password });
	}

	return (
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
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</Form.Group>
				<Form.Group size='lg' controlId='password'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</Form.Group>

				
				<Button block size='lg' type='submit' disabled={!validateForm()}>
					Login
				</Button>
			</Form>
		</div>);
}

export default Signup;
