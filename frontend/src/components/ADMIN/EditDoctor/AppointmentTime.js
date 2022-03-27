import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { alertAdded } from "../../../store/alert";
import { setLoading } from "../../../store/auth";
import getDoctorAppointmentDurationAPI from "../../../api/adminAPI/getDoctorAppointmentDurationAPI";
import setDoctorAppointmentDurationAPI from "../../../api/adminAPI/setDoctorAppointmentDurationAPI";
function AppointmentTime(props) {
	const [appointmentTime, setAppointmentTime] = useState(0);
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const { doctor_id } = props;
	console.log(doctor_id);
	useEffect(() => {
		dispatch(setLoading({ loading: true }));
		getDoctorAppointmentDurationAPI({ token: auth.token, doctor_id: doctor_id })
			.then((response) => {
				if (response.success) {
					setAppointmentTime(response.data.duration);
				}
			})
			.finally(() => {
				dispatch(setLoading({ loading: false }));
			});
	}, [auth.isauth]);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(setLoading({ loading: true }));
		setDoctorAppointmentDurationAPI({
			token: auth.token,
			duration: appointmentTime,
			doctor_id: doctor_id,
		})
			.then((response) => {
				if (response.success) {
					dispatch(
						alertAdded({ variant: "success", message: response.message })
					);
				} else {
					dispatch(
						alertAdded({ variant: "danger", message: response.message })
					);
				}
			})
			.finally(() => {
				dispatch(setLoading({ loading: false }));
			});
	};

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<div className='row'>
					<h2 id='headerTitle'>Appointment Time</h2>
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
