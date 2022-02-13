import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";

//import TimePicker from "react-time-picker";
import DateFnsUtils from "@date-io/date-fns";
import { useSelector } from "react-redux";
import moment from "moment";
import setAvailabilityAPI from "../../../api/setAvailabilityAPI";
import getDoctorAvailabilityAPI from "../../../api/getDoctorAvailabilityAPI";
import SchedulerComponent from "../../SchedulerComponent";
import {
	KeyboardTimePicker,
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
function Availability() {
	const token = useSelector((state) => state.auth.token);
	const [availDate, setavailDate] = useState(new Date());
	const [start_time, setstart_time] = useState(new Date());
	const [end_time, setend_time] = useState(new Date());
	const [openPopup, setOpenPopup] = useState(false);
	const [calData, setCalData] = useState({});
	useEffect(() => {
		getDoctorAvailabilityAPI({ token }).then((response) => {
			if (response.success) {
				var tmp = [];
				for (let i = 0; i < response.data.availability.length; i++) {
					// console.log(response.data.appointments[i].id, response.data.appointments[i].Subject);
					tmp.push({
						//Id: response.data.availability[i].appointment_id,
						//Subject: response.data.availability[i].patient_name,
						StartTime: response.data.availability[i].start_time,
						EndTime: response.data.availability[i].end_time,
						// Description:
						// 	"DESCRIPTION: " +
						// 	response.data.availability[i].case_description +
						// 	", " +
						// 	"CASE ID: " +
						// 	response.data.availability[i].case_id +
						// 	", " +
						// 	"STATE: " +
						// 	response.data.availability[i].state,
						// StartTime: new Date(2021, 8, 21, 0,0),
						// EndTime: new Date(2021, 8, 21, 1,0),
					});
				}
				var tmp1 = { dataSource: tmp };
				setCalData(tmp1);
			}
		});
	}, [openPopup]);
	const onSaveChanges = async () => {
		console.log(moment(start_time).format("HH:mm"));
		console.log(availDate);
		var ast =
			moment(availDate).format("yyyy-MM-DD") +
			" " +
			moment(start_time).format("HH:mm") +
			":00";
		var aet =
			moment(availDate).format("yyyy-MM-DD") +
			" " +
			moment(end_time).format("HH:mm") +
			":00";

		//console.log(ast);
		//console.log(aet);
		var st = new Date(ast);
		var et = new Date(aet);
		if (st < new Date() || et < new Date() || st > et) {
			alert(
				"Enter date and time after the current time and make sure start time is not greater than end time"
			);
			return;
		}
		await setAvailabilityAPI({
			token: token,
			start_time: ast,
			end_time: aet,
		}).then((res) => {
			if (res.success) {
				alert(res.message);
			} else {
				alert(res.message);
			}
		});
		setOpenPopup(false);
		// setavailDate(new Date());
		// setstart_time(new Date());
		// setend_time(new Date());
	};
	const onPopupOpen = (args) => {
		//console.log(args.data);
		//history.push("/home", {data: args.data});
	};
	return (
		<div>
			<div className='text-center' style={{ padding: "2rem" }}>
				<Button
					variant='outline-dark'
					size='sm'
					className='NewCaseButton'
					onClick={() => {
						setOpenPopup(true);
					}}
				>
					Give Availability
				</Button>
			</div>
			<div>
				<SchedulerComponent localData={calData} onPopupOpen={onPopupOpen} />
			</div>
			<Modal show={openPopup} onHide={() => setOpenPopup(false)} centered>
				{/* <Modal.Header closeButton></Modal.Header> */}
				<Modal.Body>
					<div className='availability'>
						<h1> Give Availability </h1>
						<Form>
							{/* <Row style={{ margin: "1rem" }}>

                </Row> */}
							<Form.Group className='mb-3'>
								<Form.Label>Select Date</Form.Label>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
										//dateFormat='dd-MM-yyyy'
										value={availDate}
										minDate={new Date()}
										onChange={(date) => setavailDate(date)}
										//className='date-picker'
									/>
								</MuiPickersUtilsProvider>
							</Form.Group>
							<span>
								<Form.Group className='mb-3'>
									<Form.Label>Start Time</Form.Label>
									{"  "}
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardTimePicker
											value={start_time}
											// minTime={new Date()}
											//clearIcon={false}
											onChange={(time) => setstart_time(time)}
										/>
									</MuiPickersUtilsProvider>
								</Form.Group>
								<Form.Group className='mb-3'>
									<Form.Label>End Time</Form.Label>
									{"  "}

									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardTimePicker
											value={end_time}
											// minTime={new Date()}
											//clearIcon={false}
											onChange={(time) => setend_time(time)}
										/>
									</MuiPickersUtilsProvider>
								</Form.Group>
							</span>
							<div className='text-center' style={{ paddingTop: "2rem" }}>
								<Button
									variant='outline-dark'
									size='sm'
									className='NewCaseButton'
									onClick={onSaveChanges}
								>
									Save Changes
								</Button>
							</div>
						</Form>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default Availability;
