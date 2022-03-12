import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navigation from "../Navigation";
import { useNavigate } from "react-router";
import Doctors from "./Doctors/Doctors";
function Home() {
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
			<Doctors />
		</div>
	);
}

export default Home;
