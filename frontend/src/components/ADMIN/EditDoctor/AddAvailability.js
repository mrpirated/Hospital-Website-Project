import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Alert } from "react-bootstrap";
import DateFnsUtils from "@date-io/date-fns";
import {
	KeyboardDatePicker,
	KeyboardTimePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import addAvailabilityAPI from "../../../api/adminAPI/addAvailabilityAPI";
import moment from "moment";
function AddAvailability(props) {
	const [dayCheck, setDayCheck] = useState([0, 0, 0, 0, 0, 0, 0]);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [start_time, setstart_time] = useState(new Date());
	const [end_time, setend_time] = useState(new Date());
	const auth = useSelector((state) => state.auth);
	const { doctor_id } = props;
	const dayarr = [
		"sunday",
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
	];
	const mparr = {
		sunday: 0,
		monday: 1,
		tuesday: 2,
		wednesday: 3,
		thursday: 4,
		friday: 5,
		saturday: 6,
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		var date = new Date(startDate);
		var end = new Date(endDate);
		console.log(dayCheck);
		while (date <= end) {
			// console.log(start_time, end_time);
			//console.log(date.getDay());

			if (dayCheck[date.getDay()] == 1) {
				console.log(date.getDay());
				console.log(date);
				addAvailabilityAPI({
					token: auth.token,
					doctor_id: doctor_id,
					start_time:
						moment(date).format("YYYY-MM-DD") +
						" " +
						moment(start_time).format("HH:mm") +
						":00",
					end_time:
						moment(date).format("YYYY-MM-DD") +
						" " +
						moment(end_time).format("HH:mm") +
						":00",
				});
			}

			date.setDate(date.getDate() + 1);
		}
	};
	return (
		<div>
			<h2 id='headerTitle'>Add Availability</h2>

			<Form onSubmit={handleSubmit}>
				<Form.Label>Start Date</Form.Label>
				<Form.Group>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							autoOk
							variant='inline'
							inputVariant='outlined'
							format='dd/MM/yyyy'
							value={startDate}
							onChange={(date) => setStartDate(date)}
							InputAdornmentProps={{ position: "start" }}
							minDate={new Date()}
						/>
					</MuiPickersUtilsProvider>
				</Form.Group>

				<Form.Label>End Date</Form.Label>
				<Form.Group>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							autoOk
							variant='inline'
							inputVariant='outlined'
							format='dd/MM/yyyy'
							value={endDate}
							onChange={(date) => setEndDate(date)}
							InputAdornmentProps={{ position: "start" }}
							minDate={new Date()}
						/>
					</MuiPickersUtilsProvider>
				</Form.Group>
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
				<Form.Group>
					{dayarr.map((d) => (
						<Form.Check
							inline
							label={d}
							type='checkbox'
							checked={dayCheck[mparr[d]] == 1 ? true : false}
							onChange={() => {
								//console.log(d);
								// var dc = dayCheck;
								// console.log(dayCheck);
								// dc[d] = dc[d] ^ 1;
								// console.log(dc);
								// setDayCheck(dc);
								var dc = [...dayCheck];
								dc[mparr[d]] ^= 1;
								setDayCheck(dc);
								//console.log(dayCheck);
							}}
						/>
					))}
				</Form.Group>
				<div className='text-center' style={{ paddingTop: "2rem" }}>
					<Button
						variant='outline-dark'
						size='sm'
						className='NewCaseButton'
						type='submit'
					>
						Set Availability
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default AddAvailability;
