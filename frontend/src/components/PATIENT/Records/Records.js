import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { TabNav } from "./TabNav";
import TabComponent from "./TabComponent";
import patientAllAppointmentsAPI from "../../../api/patientAllAppointmentsAPI";

export default function Records() {
	const auth = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const [past, setPast] = useState([]);
	const [all, setAll] = useState([]);
	const [future, setFuture] = useState([]);

	useEffect(() => {
		sessionStorage.setItem("lastPage", "/patient/records");

		if (!(auth.isauth && auth.type === 0)) {
			navigate("/home");
		} else {
			patientAllAppointmentsAPI({
				token: auth.token,
			}).then((res) => {
				var now = new Date();
				if (res.reply) {
					var tmp1 = res.appointments.filter(
						(item) =>
							new Date(item.start_time) >= now || item.start_time === null
					);
					console.log(tmp1);
					var tmp2 = res.appointments.filter(
						(item) =>
							item.start_time !== null && new Date(item.start_time) < now
					);
					console.log(tmp2);
					setPast(tmp2);
					setFuture(tmp1);
					setAll(res.appointments);
				} else {
					alert(res.data.msg + "\nYou will be redirected to Home.");
					setTimeout(navigate("/home"), 4000);
				}
			});
		}
	}, []);

	return (
		<div>
			<TabComponent
				tabList={TabNav}
				selectedKey='future'
				all={all}
				past={past}
				future={future}
			/>
		</div>
	);
}
