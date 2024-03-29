import React, { useState } from "react";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import loginAPI from "../../api/loginAPI";
import { loggedIn } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { alertAdded, alertRemoved } from "../../store/alert";
import { setLoading } from "../../store/auth";
import { Link } from "react-router-dom";
function LoginComponent(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const type = props.type;
	const alert = useSelector((state) => state.alert);
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
				if (type === "PATIENT") navigate("/patient");
				else if (type === "DOCTOR") navigate("/doctor");
				else navigate("/admin");
			} else {
				dispatch(alertAdded({ variant: "danger", message: res.message }));
			}
		});
	}

	return (
		<div
			id='loginform'
			onClick={() => {
				dispatch(alertRemoved());
			}}
		>
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
						<Alert show={alert.show} variant={alert.variant}>
							{alert.message}
						</Alert>
						<div className='row'>
							<label>Email</label>
							<input
								autoFocus
								type='email'
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
						<div className='row'>
							<Link to={`/${type}/forgot`}>Forgot Password</Link>
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
