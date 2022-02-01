import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../../store/auth";
import { Form } from "react-bootstrap";
import changePasswordAPI from "../../../api/changePasswordAPI";
function LoginInfo() {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(setLoading({ loading: true }));
		if (newPassword === confirmPassword) {
			changePasswordAPI({ token: auth.token, password, newPassword }).then(
				(response) => {
					if (response.success) {
						alert(response.message);
					} else alert(response.message);
					dispatch(setLoading({ loading: false }));
				}
			);
		} else alert("Passwords don't match");
	};
	return (
		<div>
			<div>
				<Form onSubmit={handleSubmit}>
					<div
						style={{
							margin: "0px 10px 25px",
							padding: "0px 10px 25px",
							backgroundColor: "rgba(0,0,0,.1)",
							boxShadow: "0 4px 5px 2px rgb(0 0 0 / 30%)",
						}}
					>
						<h2 id='headerTitle'>Change Password</h2>
						<div className='row'>
							<label>Current Password</label>
							<input
								// placeholder="Enter your Last Name"
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className='row'>
							<label>New Password</label>
							<input
								// placeholder="Enter your Last Name"
								type='password'
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
							/>
						</div>
						<div className='row'>
							<label>Confirm Password</label>
							<input
								// placeholder="Enter your Last Name"
								type='password'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>
						<div id='button' className='row'>
							<button style={{ width: "45%", fontSize: "15px" }} type='submit'>
								Change Password
							</button>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default LoginInfo;
