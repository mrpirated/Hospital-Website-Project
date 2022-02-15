import React from "react";
import Navigation from "../../Navigation";
import ForgotPasswordComponent from "../../HOME/ForgotPasswordComponent";
import config from "../../../config/config";
function ForgotPassword() {
	return (
		<div>
			<Navigation />
			<ForgotPasswordComponent type={config.DOCTOR} />
		</div>
	);
}

export default ForgotPassword;
