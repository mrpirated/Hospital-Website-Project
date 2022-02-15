import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { alertAdded, alertRemoved } from "../../store/alert";
import { useHistory } from "react-router";
import { setLoading } from "../../store/auth";
import forgotPasswordAPI from "../../api/forgotPasswordAPI";
import PhoneInput from "react-phone-number-input";
import { Redirect } from "react-router-dom";
function ForgotPasswordComponent(props) {
	const type = props.type;
	const alert = useSelector((state) => state.alert);
	const history = useHistory();
	const dispatch = useDispatch();
	const [otp, setOtp] = useState("");
	const [phone, setPhone] = useState();
	const [password, setPassword] = useState("");
	const [gotOtp, setGotOtp] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(setLoading({ loading: true }));
		var user = {
			type,
			phone,
			password,
		};
		if (gotOtp) {
			user.otp = otp;
		}
		forgotPasswordAPI({ user })
			.then((response) => {
				if (response.success) {
					if (!gotOtp) {
						setGotOtp(true);
					} else {
						dispatch(
							alertAdded({ variant: "success", message: response.message })
						);
						setTimeout(() => {
							var rdto = "/login";
							if (type === "doctor") rdto = "/doctor/login";
							history.push(rdto);
						}, 1000);
					}
				} else {
					dispatch(
						alertAdded({ variant: "danger", message: response.message })
					);
				}
			})
			.finally(() => {
				dispatch(setLoading({ loading: false }));
			});
	};
	return (
		<div
			id='forgotform'
			onClick={() => {
				dispatch(alertRemoved());
			}}
		>
			<Form onSubmit={handleSubmit}>
				<h2 id='headerTitle'>Forgot Password</h2>
				<Alert show={alert.show} variant={alert.variant}>
					{alert.message}
				</Alert>
				<div className='row'>
					<label>Phone Number</label>
					<PhoneInput
						placeholder='Enter phone number connected to your account'
						defaultCountry='IN'
						value={phone}
						style={{ width: "85%" }}
						onChange={setPhone}
					/>
				</div>
				<div className='row'>
					<label>New Password</label>
					<input
						type='password'
						// placeholder='Enter your password'
						placeholder='Enter New Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				{gotOtp && (
					<div className='row'>
						<label>ENTER OTP</label>
						<input
							type='text'
							placeholder='Enter Otp'
							onChange={(e) => {
								setOtp(e.target.value);
							}}
						/>
					</div>
				)}
				<div id='button' className='row'>
					<button type='submit'>{gotOtp ? "Set Password" : "Get OTP"}</button>
				</div>
			</Form>
		</div>
	);
}

export default ForgotPasswordComponent;
