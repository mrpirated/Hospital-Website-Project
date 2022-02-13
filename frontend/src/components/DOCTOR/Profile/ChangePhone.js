import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import { Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import verifyPhoneAPI from "../../../api/verifyPhoneAPI";
function ChangePhone() {
	const auth = useSelector((state) => state.auth);
	const [openPopup, setOpenPopup] = useState(false);
	const [phone, setPhone] = useState();
	const [otp, setOtp] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();

		if (auth.user.phone === phone) {
			alert("Phone Number is same");
		} else {
			verifyPhoneAPI({
				token: auth.token,
				user: { phone: phone },
			}).then((response) => {
				if (response.success) {
					setOpenPopup(true);
				} else {
					alert(response.message);
				}
			});
		}
	};
	const handleOTPSubmit = () => {
		verifyPhoneAPI({
			token: auth.token,
			user: { phone: phone, otp: otp },
		}).then((response) => {
			if (response.success) {
				setOpenPopup(false);
				alert("Phone no updated successfully");
			} else {
				alert(response.message);
			}
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
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body className='modal-body'>
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
