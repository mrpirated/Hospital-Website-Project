import React, { useState, useEffect } from "react";
import { Form, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { alertAdded, alertRemoved } from "../../../store/alert";
import { setLoading, setUpdateUser } from "../../../store/auth";
import updateEmailAPI from "../../../api/updateEmailAPI";
function VerifyEmail(props) {
	const { eventKey } = props;
	const auth = useSelector((state) => state.auth);
	const alert = useSelector((state) => state.alert);
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [code, setCode] = useState("");
	const [gotOtp, setGotOtp] = useState(false);
	useEffect(() => {
		setEmail(auth.user.email);
		if (eventKey == "verifyEmail") {
			if (auth.user.email_verified) {
				dispatch(
					alertAdded({ variant: "success", message: "Your Email is Verified" })
				);
			} else {
				dispatch(
					alertAdded({
						variant: "warning",
						message: "You have not verified your email",
					})
				);
			}
		}
	}, [auth.user, eventKey]);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(setLoading({ loading: true }));
		var user = {
			email: email,
		};
		if (gotOtp) {
			user.otp = otp;
			user.code = code;
		}
		updateEmailAPI({ token: auth.token, user })
			.then((response) => {
				if (response.success) {
					if (!gotOtp) {
						setGotOtp(true);
						setCode(response.data.code);
					} else {
						dispatch(
							alertAdded({ variant: "success", message: response.message })
						);
						dispatch(setUpdateUser());
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
		<div>
			<div className='inprofile'>
				<h2 id='headerTitle'>Verify Email</h2>
				<Form onSubmit={handleSubmit}>
					{/* <Alert show={alert.show} variant={alert.variant}>
						{alert.message}
					</Alert> */}
					<div className='row'>
						<label>Email</label>
						<input
							// placeholder="Enter your Last Name"

							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
						<button style={{ width: "45%", fontSize: "15px" }} type='submit'>
							{gotOtp ? "Verify Email" : "Get OTP"}
						</button>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default VerifyEmail;
