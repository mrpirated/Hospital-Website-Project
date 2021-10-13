import React, { useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { useSelector } from "react-redux";
import format from "date-fns/format";
import setAvailabilityAPI from "../../../api/setAvailabilityAPI";
function Availability() {
	const token = useSelector((state) => state.auth.token);
	const [availDate, setavailDate] = useState(new Date());
	const [start_time, setstart_time] = useState(new Date());
	const [end_time, setend_time] = useState(new Date());
	const onSaveChanges = async () => {
		console.log(start_time);
		console.log(end_time);
		console.log(format(new Date(availDate), "yyyy-MM-dd"));
		await setAvailabilityAPI({
			token: token,
			start_time:
				format(new Date(availDate), "yyyy-MM-dd") + " " + start_time + ":00",
			end_time:
				format(new Date(availDate), "yyyy-MM-dd") + " " + end_time + ":00",
		}).then((res) => {
			if (res.reply) {
				alert("Availability is Set Successfully!");
			} else {
				alert(res.data.msg);
			}
		});
		setavailDate(new Date());
		setstart_time(format(new Date(), "HH:mm"));
		setend_time(format(new Date(), "HH:mm"));
	};
	return (
		<div className='availability'>
			<h2> Give Availability </h2>
			<Form>
				{/* <Row style={{ margin: "1rem" }}>

                </Row> */}
				<Form.Group className='mb-3'>
					<Form.Label>Select Date</Form.Label>
					<DatePicker
						selected={availDate}
						minDate={new Date()}
						onChange={(date) => setavailDate(date)}
					/>
				</Form.Group>
				<span>
					<Form.Group className='mb-3'>
						<Form.Label>Start Time</Form.Label>
						{"  "}
						<TimePicker
							value={start_time}
							// minTime={new Date()}
							clearIcon={false}
							onChange={(time) => setstart_time(time)}
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>End Time</Form.Label>
						{"  "}
						<TimePicker
							value={end_time}
							// minTime={new Date()}
							clearIcon={false}
							onChange={(time) => setend_time(time)}
						/>
					</Form.Group>
				</span>
				<div className='text-center' style={{ paddingTop: "2rem" }}>
					<Button
						variant='outline-dark'
						block
						size='sm'
						className='NewCaseButton'
						onClick={onSaveChanges}
					>
						Save Changes
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default Availability;
