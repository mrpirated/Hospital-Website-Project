import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getAllPatientAppointmentsAPI from "../../../api/getAllPatientAppointmentsAPI";
import SchedulerComponent from "../../SchedulerComponent";
function Calender() {
	const auth = useSelector((state) => state.auth);
	const [localData, setLocalData] = useState({});
	useEffect(() => {
		getAllPatientAppointmentsAPI({ token: auth.token }).then((response) => {
			var tmp = [];
			console.log(response.data.appointments);
			for (let i = 0; i < response.data.appointments.length; i++) {
				// console.log(response.data.appointments[i].id, response.data.appointments[i].Subject);
				tmp.push({
					Id: response.data.appointments[i].appointment_id,
					Subject: response.data.appointments[i].doctor_name,
					StartTime: response.data.appointments[i].start_time,
					EndTime: response.data.appointments[i].end_time,
					Description:
						"DESCRIPTION: " + response.data.appointments[i].case_description,
					// StartTime: new Date(2021, 8, 21, 0,0),
					// EndTime: new Date(2021, 8, 21, 1,0),
				});
			}
			var tmp1 = { dataSource: tmp };
			setLocalData(tmp1);
		});
	}, [auth.isauth]);
	const onPopupOpen = (args) => {
		//console.log(args.data);
		//history.push("/home", {data: args.data});
	};
	return (
		<div>
			<SchedulerComponent localData={localData} onPopupOpen={onPopupOpen} />
		</div>
	);
}

export default Calender;
