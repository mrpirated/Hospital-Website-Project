import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import "./NewCase.css";
import newCaseAPI from "../../../api/newCaseAPI";

export default function NewCase() {
	const auth = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const [case_description, setCase_description] = useState("");
	function validateForm() {
		return true;
		//return email.length > 0 && password.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();
		newCaseAPI({
			token: auth.token,
			case_description,
		}).then((res) => {
			if (res.success) {
				const case_id = res.data.case_id;
				navigate("/patient/new-appointment", {
					state: {
						case_details: { case_id, case_description },
					},
				});
			} else {
				alert(res.data.msg);
			}
		});
	}

	return (
		<div>
			<div className='NewCase'>
				<h3 className='FormHeading'>Enter Details For New Case</h3>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
						<Form.Label>Case Descrption</Form.Label>
						<Form.Control
							as='textarea'
							rows={3}
							value={case_description}
							onChange={(e) => {
								setCase_description(e.target.value);
							}}
						/>
					</Form.Group>
					<div className='text-center' style={{ paddingTop: "2rem" }}>
						<Button
							variant='outline-dark'
							block
							size='sm'
							className='NewCaseButton'
							type='submit'
							disabled={!validateForm()}
						>
							Create Case And Book An Appointment
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
}
