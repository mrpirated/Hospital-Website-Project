import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./NewCase.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import format from "date-fns/format";
import newAppointmentAPI from "../../../api/newAppointmentAPI";

export default function NewAppointment(props) {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [caseDetails, setCaseDetails] = useState({});
	const [dateOfAppointment, setDateOfAppointment] = useState(new Date());
	const [startTime, setStartTime] = useState("00:00");
	const [endTime, setEndTime] = useState("00:00");
	const [doctorId, setDoctorId] = useState(undefined);

	useEffect(() => {
		if (
			props.location.state !== undefined &&
			props.location.state.case_details !== undefined
		) {
			setCaseDetails(props.location.state.case_details);
		} else if (props.case_details !== undefined) {
			setCaseDetails(props.case_details);
		} else {
			history.push("/home");
		}
	}, []);

	function validateForm() {
		return true;
		//return email.length > 0 && password.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();
		const start_time =
			format(dateOfAppointment, "yyyy-MM-dd") + " " + startTime + ":00";
		const end_time =
			format(dateOfAppointment, "yyyy-MM-dd") + " " + endTime + ":00";

		newAppointmentAPI({
			token: auth.token,
			case_id: caseDetails.case_id,
			doctor_id: doctorId,
			start_time: start_time,
			end_time: end_time,
		}).then((res) => {
			if (res.reply) {
				history.push("/patient");
			} else {
				alert(res.data.msg);
			}
		});
		// console.log(start_time);
		// console.log(end_time);
	}

	return (
		<div>
			<div className='NewCase'>
				<h3 className='FormHeading'>Enter Details For Appointment</h3>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
						<Form.Label>Case ID</Form.Label>
						<Form.Control
							type='text'
							value={caseDetails.case_id}
							disabled={true}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
						<Form.Label>Example textarea</Form.Label>
						<Form.Control as='textarea' rows={3} />
					</Form.Group>
					<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
						<Form.Label>Select Doctor ID</Form.Label>
						<Form.Control
							type='text'
							value={doctorId}
							onChange={(e) => setDoctorId(e.target.value)}
						/>
					</Form.Group>
					<Row>
						<Form.Group as={Col}>
							<Form.Label>Date Of Appointment</Form.Label>
							<DatePicker
								selected={dateOfAppointment}
								onChange={(date) => setDateOfAppointment(date)}
								minDate={new Date()}
							/>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label style={{ display: "block" }}>Start Time</Form.Label>
							<TimePicker onChange={setStartTime} value={startTime} />
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label style={{ display: "block" }}>End Time</Form.Label>
							<TimePicker onChange={setEndTime} value={endTime} />
						</Form.Group>
					</Row>
					<div className='text-center' style={{ paddingTop: "2rem" }}>
						<Button
							variant='outline-dark'
							block
							size='sm'
							className='NewCaseButton'
							type='submit'
							disabled={!validateForm()}
						>
							Book An Appointment
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
}
