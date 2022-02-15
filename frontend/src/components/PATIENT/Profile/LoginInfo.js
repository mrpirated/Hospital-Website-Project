import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../../store/auth";
import { alertAdded } from "../../../store/alert";
import { Form } from "react-bootstrap";
import changePasswordAPI from "../../../api/changePasswordAPI";
function LoginInfo() {
	const auth = useSelector((state) => state.auth);
	const alert = useSelector((state) => state.alert);
	const dispatch = useDispatch();
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();

		if (newPassword === confirmPassword) {
			dispatch(setLoading({ loading: true }));
			changePasswordAPI({ token: auth.token, password, newPassword })
				.then((response) => {
					if (response.success) {
						dispatch(
							alertAdded({ variant: "success", message: "Password Updated" })
						);
					} else
						dispatch(
							alertAdded({ variant: "danger", message: response.message })
						);
				})
				.finally(() => {
					dispatch(setLoading({ loading: false }));
				});
		} else
			dispatch(
				alertAdded({ variant: "danger", message: "Passwords Don't match" })
			);
	};
	return (
		<div>
			<div>
				<Form onSubmit={handleSubmit}>
					<div className='inprofile'>
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
