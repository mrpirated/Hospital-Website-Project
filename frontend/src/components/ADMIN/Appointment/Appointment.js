import React, { useEffect, useState } from "react";
import remaining_appointmentAPI from "../../../api/remaining_appointmentAPI";
import { useSelector } from "react-redux";
function Appointment() {
	const token = useSelector((state) => state.auth.token);
	const [appointments, setappointments] = useState();
	//console.log(token);
	useEffect(() => {
		const fetchData = async () => {
			await remaining_appointmentAPI(token).then((res) => {
				setappointments(res);
				//console.log(res);
			});
		};
		fetchData();
		//console.log(appointments[0]);
	}, []);

	return (
		<div>
			<li>here</li>
		</div>
	);
}

export default Appointment;
