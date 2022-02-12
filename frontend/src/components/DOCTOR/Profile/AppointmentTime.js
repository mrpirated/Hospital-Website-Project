import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import getDoctorAppointmentDurationAPI from "../../../api/getDoctorAppointmentDurationAPI";
import setDoctorAppointmentDurationAPI from "../../../api/setDoctorAppointmentDurationAPI";
function AppointmentTime() {
	const [appointmentTime, setAppointmentTime] = useState();
	const auth = useSelector((state) => state.auth);
	useEffect(() => {
		getDoctorAppointmentDurationAPI({ token: auth.token }).then((response) => {
			if (response.success) {
				setAppointmentTime(response.data.duration);
			}
		});
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		setDoctorAppointmentDurationAPI({
			token: auth.token,
			duration: appointmentTime,
		}).then((response) => {
			alert(response.message);
		});
	};

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<div className='row'>
					<label>Appointment Time</label>
					Enter Duration in minutes
					<input
						type='number'
						placeholder='Enter Duration of Appointment'
						value={appointmentTime}
						onChange={(e) => setAppointmentTime(e.target.value)}
					/>
				</div>
				<div id='button' className='row'>
					<button style={{ width: "45%", fontSize: "15px" }} type='submit'>
						Set Duration
					</button>
				</div>
			</Form>
		</div>
	);
}

export default AppointmentTime;
