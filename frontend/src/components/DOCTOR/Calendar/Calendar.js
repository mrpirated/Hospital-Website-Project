import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import doctorAppointmentsAPI from "../../../api/doctorAppointmentsAPI";
import SchedulerComponent from "../../SchedulerComponent";

function Calendar() {
	const auth = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const [localData, setLocalData] = useState({});
	useEffect(() => {
		doctorAppointmentsAPI({
			token: auth.token,
		}).then((response) => {
			if (response.success) {
				var tmp = [];
				console.log(response.data.appointments);
				for (let i = 0; i < response.data.appointments.length; i++) {
					// console.log(response.data.appointments[i].id, response.data.appointments[i].Subject);
					if (response.data.appointments[i].state === "cancelled") continue;
					tmp.push({
						Id: response.data.appointments[i].appointment_id,
						Subject: response.data.appointments[i].patient_name,
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
			} else {
				// alert(res.data.msg + "\nYou will be redirected to Home.");
				// setTimeout(history.push("/home"), 4000);
			}
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

export default Calendar;
