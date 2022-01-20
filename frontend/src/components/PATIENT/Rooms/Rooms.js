import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getScheduledAppointmentsAPI from "../../../api/getScheduledAppointmentsAPI";
function Rooms() {
	const auth = useSelector((state) => state.auth);
	const [appointments, setAppointments] = useState();
	useEffect(() => {
		getScheduledAppointmentsAPI({ token: auth.token }).then((response) => {
			//console.log(response);
			if (response.success) {
				setAppointments(response.data.appointments);
			} else {
				console.loh(response);
				alert(response.message);
			}
		});
	}, []);
	return <div></div>;
}

export default Rooms;
