import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import { Form, Modal, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { alertAdded } from "../../../store/alert";
import { setLoading, userUpdated } from "../../../store/auth";
import verifyPhoneAPI from "../../../api/verifyPhoneAPI";
import tokenAPI from "../../../api/tokenAPI";
function ChangePhone() {
	const auth = useSelector((state) => state.auth);
	const alert = useSelector((state) => state.alert);
	const dispatch = useDispatch();
	const [openPopup, setOpenPopup] = useState(false);
	const [phone, setPhone] = useState();
	const [otp, setOtp] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();

		if (auth.user.phone === phone) {
			dispatch(
				alertAdded({ variant: "warning", message: "Phone Number is Same" })
			);
		} else {
			dispatch(setLoading({ loading: true }));
			verifyPhoneAPI({
				token: auth.token,
				user: { phone: phone },
			})
				.then((response) => {
					if (response.success) {
						setOpenPopup(true);
					} else {
						dispatch(
							alertAdded({ variant: "danger", message: response.message })
						);
					}
				})
				.finally(() => {
					dispatch(setLoading({ loading: false }));
				});
		}
	};
	const handleOTPSubmit = () => {
		dispatch(setLoading({ loading: true }));
		verifyPhoneAPI({
			token: auth.token,
			user: { phone: phone, otp: otp },
		})
			.then((response) => {
				if (response.success) {
					setOpenPopup(false);
					//alert("Phone no updated successfully");
					dispatch(
						alertAdded({
							variant: "success",
							message: "Phone no updated successfully",
						})
					);
					return tokenAPI(auth.token);
				} else {
					return Promise.reject(response);
				}
			})
			.then((response) => {
				if (response.success) {
					dispatch(userUpdated({ user: response.data.user }));
				} else return Promise.reject(response);
			})
			.catch((err) => {
				dispatch(alertAdded({ variant: "danger", message: err.message }));
				console.log(err);
			})
			.finally(() => {
				dispatch(setLoading({ loading: false }));
			});
	};
	useEffect(() => {
		if (auth.user.phone) {
			setPhone(auth.user.phone);
		}
	}, [auth.isauth]);
	return (
		<div>
			<Form onSubmit={handleSubmit}>
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
				<div id='button' className='row'>
					<button style={{ width: "45%", fontSize: "15px" }} type='submit'>
						Get Otp
					</button>
				</div>
			</Form>
			<Modal show={openPopup} onHide={() => setOpenPopup(false)}>
				<Modal.Header closeButton />
				<Modal.Body className='modal-body'>
					<Alert show={alert.show} variant={alert.variant}>
						{alert.message}
					</Alert>
					<div className='row'>
						<label style={{ color: "black", fontSize: "30px" }}>
							Enter OTP
						</label>
						<input
							type='text'
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
						/>
					</div>
					<div className='row'>
						<label style={{ color: "black" }}>
							OTP sent to phone number {phone}
						</label>
					</div>
					<div id='button' class='row'>
						<button
							style={{ width: "45%", fontSize: "15px" }}
							onClick={handleOTPSubmit}
						>
							Submit
						</button>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default ChangePhone;
