import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import loginAPI from "../../../api/loginAPI";
import { loggedIn } from "../../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import doctorLogo from '../../PATIENT/Login/undraw_medicine_b-1-ol.svg';
import Navigation from "../../Navigation";
export default function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const history = useHistory();
	const [isDoctor, setIsDoctor] = useState(false);

	function validateForm() {
		return email.length > 0 && password.length > 0;
	}
	useEffect(() => {
		if (auth.isauth) {
			if (auth.type === 0) {
				history.push("/patient");
			} else if (auth.type === 1) {
				history.push("/doctor");
			} else if (auth.type === 2) {
				history.push("/admin");
			}
		}
	});
	function handleSubmit(event) {
		event.preventDefault();
		loginAPI({
			email: email,
			password: password,
			type: 1,
		}).then((res) => {
			if (res.reply) {
				dispatch(
					loggedIn({
						user: res.data.user,
						token: res.data.token,
						type: res.data.type,
					})
				);
				if (res.data.type === 1) history.push("/doctor");
				else history.push("/patient");
			} else {
				alert(res.data.msg);
				//alert(res.data);
			}
		});
	}
	return (
		<div>
			<Navigation />
			<div id='loginform' style={{backgroundColor: "#ffffe6"}}>
				<div id="left">
					<img style={{ height: "120%", width: "100%", margin: "auto"}} src={doctorLogo} alt={"doctor_logo"}/>
				</div>
				<div id="right">
					<Form onSubmit={handleSubmit}>
						<div>
							<h2 id='headerTitle'>Login</h2>
							<div class='row'>
								<label>Email</label>
								<input
									autoFocus
									type='text'
									// placeholder='Enter your email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div class='row'>
								<label>Password</label>
								<input
									type='password'
									// placeholder='Enter your password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div id='button' class='row'>
								<button type='submit' disabled={!validateForm()}>
									Log in
								</button>
							</div>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}
