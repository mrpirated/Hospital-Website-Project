import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import loginAPI from "../../../api/loginAPI";
import { loggedIn } from "../../../store/auth";
import "./Login.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const history = useHistory();

	function validateForm() {
		return email.length > 0 && password.length > 0;
	}
	useEffect(() => {
		if (auth.isauth) {
			if (auth.type === 2) {
				history.push("/admin");
			} else {
				history.push("/home");
			}
		}
	});
	function handleSubmit(event) {
		event.preventDefault();
		loginAPI({
			email: email,
			password: password,
			type: 2,
		}).then((res) => {
			if (res.reply) {
				if (res.data.type === 2) {
					res.data.user = { ...res.data.user, first_name: "Admin" };
				}
				dispatch(
					loggedIn({
						user: res.data.user,
						token: res.data.token,
						type: res.data.type,
					})
				);
				history.push("/admin");
			} else {
				alert(res.data.msg);
			}
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