import React, { useState } from "react";
import { Redirect, useHistory } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import loginAPI from "../../../api/loginAPI";
import { loggedIn } from "../../../store/auth";
import "./Login.css";
import { useDispatch } from "react-redux";

export default function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const history = useHistory();
	function validateForm() {
		return email.length > 0 && password.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();
		loginAPI({
			email: email,
			password: password,
		}).then((res) => {
			dispatch(
				loggedIn({
					user: res.user,
					token: res.token,
					type: 0,
				})
			);
			history.push("/patient");
		});
	}
	return (
		<div>
			<div className='Login'>
				<Form onSubmit={handleSubmit}>
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
					<Button block size='lg' type='submit' disabled={!validateForm()}>
						Login
					</Button>
				</Form>
			</div>
		</div>
	);
}
