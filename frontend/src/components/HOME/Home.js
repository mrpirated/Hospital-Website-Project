import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navigation from "../Navigation";
import { useHistory } from "react-router";
function Home() {
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
		<div>
			<Navigation />
			Welcome Home
		</div>
	);
}

export default Home;
