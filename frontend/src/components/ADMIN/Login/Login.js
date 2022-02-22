import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import "./Login.css";
import { useSelector } from "react-redux";
import doctorLogo from "../../PATIENT/Login/undraw_doctors_hwty.svg";
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

	return <LoginComponent type={config.ADMIN} doctorLogo={doctorLogo} />;
}
