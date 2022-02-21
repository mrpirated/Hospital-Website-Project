import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import doctorLogo from "./undraw_doctors_hwty.svg";
import Navigation from "../../Navigation";
import LoginComponent from "../../HOME/LoginComponent";
import config from "../../../config/config";

export default function Login(props) {
	const auth = useSelector((state) => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.isauth) {
			if (auth.type === "patient") {
				navigate("/patient");
			} else if (auth.type === "doctor") {
				navigate("/doctor");
			} else if (auth.type === "admin") {
				navigate("/admin");
			}
		}
	});

	return (
		<div>
			<Navigation />
			<LoginComponent type={config.PATIENT} doctorLogo={doctorLogo} />
		</div>
	);
}
