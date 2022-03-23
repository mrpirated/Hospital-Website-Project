import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../store/auth";
import { alertAdded, alertRemoved } from "../../../store/alert";
import moment from "moment";
import {
	Form,
	Button,
	Alert,
	Col,
	DropdownButton,
	Dropdown,
} from "react-bootstrap";

import newAppointmentAPI from "../../../api/newAppointmentAPI";
import DateFnsUtils from "@date-io/date-fns";
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import getDoctorsAPI from "../../../api/getDoctorsAPI";
import getDoctorDaySlotsAPI from "../../../api/getDoctorDaySlotsAPI";
export default function NewAppointment() {
	const auth = useSelector((state) => state.auth);
	const alert = useSelector((state) => state.alert);
	const navigate = useNavigate();
	const location = useLocation();
	const { case_details } = location.state;
	const [slots, setSlots] = useState([]);
	const [dateOfAppointment, setDateOfAppointment] = useState(new Date());
	const [doctorId, setDoctorId] = useState(undefined);
	const [selectedDoctor, setSelectedDoctor] = useState("SELECT DOCTOR");
	const [doctorDetails, setDoctorDetails] = useState([]);
	const [selectedSlot, setSelectedSlot] = useState();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setLoading({ loading: true }));

		getDoctorsAPI({
			token: auth.token,
		})
			.then((res) => {
				if (res.success) {
					setDoctorDetails(res.data.doctor);
				}
			})
			.finally(() => {
				dispatch(setLoading({ loading: false }));
			});
	}, [auth.isauth]);
	useEffect(() => {
		getDoctorDaySlotsAPI({
			token: auth.token,
			doctor_id: doctorId,
			date: moment(dateOfAppointment).format("YYYY-MM-DD"),
		}).then((response) => {
			console.log(response);
			if (response.success) {
				setSlots(response.data.slots);
			}
		});
	}, [auth.isauth, doctorId, dateOfAppointment]);
	function handleSubmit(event) {
		event.preventDefault();
		// const start_time =
		// 	format(dateOfAppointment, "yyyy-MM-dd") + " " + startTime + ":00";
		// const end_time =
		// 	format(dateOfAppointment, "yyyy-MM-dd") + " " + endTime + ":00";
		dispatch(setLoading({ loading: true }));

		newAppointmentAPI({
			token: auth.token,
			case_id: case_details.case_id,
			doctor_id: doctorId,
			preferred_date: moment(dateOfAppointment).format("YYYY-MM-DD"),
			patient_id: auth.user.patient_id,
		})
			.then((res) => {
				if (res.success) {
					dispatch(alertAdded({ variant: "success", message: res.message }));
				} else {
					dispatch(alertAdded({ variant: "danger", message: res.message }));
				}
				navigate(-2);
			})
			.catch((err) => {
				dispatch(alertAdded({ variant: "danger", message: err.message }));
				console.log(err);
			})
			.finally(() => {
				dispatch(setLoading({ loading: false }));
			});
		// console.log(start_time);
		// console.log(end_time);
	}

	return (
		<div>
			<div
				className='NewCase'
				onClick={() => {
					dispatch(alertRemoved());
				}}
			>
				<Alert show={alert.show} variant={alert.variant}>
					{alert.message}
				</Alert>
				<h3 className='FormHeading'>Enter Details For Appointment</h3>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
						<Form.Label>Select Doctor</Form.Label>
						<DropdownButton
							variant='secondary'
							id='dropdown-basic-button'
							title={selectedDoctor}
						>
							{doctorDetails.map((dd) => {
								return (
									<Dropdown.Item
										onClick={(e) => {
											//console.log(e.target.value);
											setSelectedDoctor(dd.first_name + " " + dd.last_name);
											setDoctorId(dd.doctor_id);
										}}
									>
										<div>{dd.first_name + " " + dd.last_name}</div>
									</Dropdown.Item>
								);
							})}
						</DropdownButton>
						{/* <Form.Control
							type='text'
							value={doctorId}
							onChange={(e) => setDoctorId(e.target.value)}
						/> */}
					</Form.Group>
					<Form.Label>Preferred Date Of Appointment</Form.Label>
					<Form.Group as={Col}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								autoOk
								variant='inline'
								inputVariant='outlined'
								format='dd/MM/yyyy'
								value={dateOfAppointment}
								onChange={(date) => setDateOfAppointment(date)}
								InputAdornmentProps={{ position: "start" }}
								// minDate={new Date()}
							/>
						</MuiPickersUtilsProvider>
						{/* <ReactDatePicker
							value={dateOfAppointment}
							onChange={(date) => setDateOfAppointment(date)}
							minDate={new Date()}
						/> */}
					</Form.Group>
					{slots.length > 0
						? slots.map((s) => (
								<Form.Check
									inline
									label={moment(s.start_time).format("hh:mm A")}
									type='radio'
									checked={selectedSlot == s.slot_id ? true : false}
									id={s.slot_id}
									onChange={() => {
										console.log(s.slot_id);
										setSelectedSlot(s.slot_id);
									}}
								/>
						  ))
						: "No slots Available"}
					<div className='text-center' style={{ paddingTop: "2rem" }}>
						<Button
							variant='outline-dark'
							size='sm'
							className='NewCaseButton'
							type='submit'
						>
							Book An Appointment
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
}
