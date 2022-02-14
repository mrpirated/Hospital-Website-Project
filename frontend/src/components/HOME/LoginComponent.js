import React, { useState } from "react";
import { useHistory } from "react-router";
import Form from "react-bootstrap/Form";
import loginAPI from "../../api/loginAPI";
import { loggedIn } from "../../store/auth";
import { useDispatch } from "react-redux";

function LoginComponent(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const history = useHistory();
	const type = props.type;

	function validateForm() {
		return email.length > 0 && password.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();
		loginAPI({
			email: email,
			password: password,
			type: type,
		}).then((res) => {
			//console.log(res);
			if (res.success) {
				dispatch(
					loggedIn({
						user: res.data.user,
						token: res.data.token,
						type: type,
					})
				);
				if (type === "PATIENT") history.push("/patient");
				else if (type === "DOCTOR") history.push("/doctor");
				else history.push("/admin");
			} else {
				alert(res.message);
			}
		});
	}

	return (
		<div id='loginform'>
			<div id='left'>
				<img
					style={{ height: "120%", width: "100%", margin: "auto" }}
					src={props.doctorLogo}
					alt={"doctor_logo"}
				/>
			</div>
			<div id='right'>
				<Form onSubmit={handleSubmit}>
					<div>
						<h2 id='headerTitle'>Login</h2>
						<div className='row'>
							<label>Email</label>
							<input
								autoFocus
								type='text'
								// placeholder='Enter your email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className='row'>
							<label>Password</label>
							<input
								type='password'
								// placeholder='Enter your password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div id='button' className='row'>
							<button type='submit' disabled={!validateForm()}>
								Log in
							</button>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default LoginComponent;
