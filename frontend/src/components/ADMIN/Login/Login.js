import React, { useEffect } from "react";
import { useHistory } from "react-router";
import "./Login.css";
import { useSelector } from "react-redux";
import doctorLogo from "../../PATIENT/Login/undraw_doctors_hwty.svg";
import LoginComponent from "../../HOME/LoginComponent";
import config from "../../../config/config";

export default function Login(props) {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	
	useEffect(() => {
		if (auth.isauth) {
			if (auth.type === "patient") {
				history.push("/patient");
			} else if (auth.type === "doctor") {
				history.push("/doctor");
			} else if (auth.type === "admin") {
				history.push("/admin");
			}
		}
	});
	
	return (
		<LoginComponent type={config.ADMIN} doctorLogo={doctorLogo}/>
	);
}
