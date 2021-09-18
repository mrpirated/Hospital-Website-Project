import React, { useState } from "react";
import remaining_appointmentAPI from "../../../api/remaining_appointmentAPI";
import { useSelector } from "react-redux";
function Appointment() {
	const token = useSelector((state) => state.auth.token);
	const [appointments, setappointments] = useState();
	//console.log(token);
	remaining_appointmentAPI(token).then();
	console.log(appointments);
	return (
		<div>
			<li>here</li>
		</div>
	);
}

export default Appointment;
