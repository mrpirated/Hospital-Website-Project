import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Icon } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import getDoctorSpecializationAPI from "../../../api/getDoctorSpecializationAPI";
import getSpecializationAPI from "../../../api/getSpecializationAPI";
function AddSpecialization() {
	const [specialization, setSpecialization] = useState([]);
	const [allSpecializations, setAllSpecializations] = useState([]);
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	useEffect(() => {
		getDoctorSpecializationAPI({ token: auth.token }).then((response) => {
			if (response.success) {
				setSpecialization(response.data.specialization);
				console.log(response.data);
			}
		});
		getSpecializationAPI({ token: auth.token }).then((response) => {
			console.log(response);
			if (response.success) {
				setAllSpecializations(response.data.specialization);
				console.log(response.data);
			}
		});
	}, [auth.isauth]);
	// useState(() => {
	// 	console.log(auth.token);

	// }, [auth.isauth]);
	return (
		<div>
			<Form>
				<div className='inprofile'>
					<h3 id='headerTitle'>Specialization</h3>
					{specialization.map((spec) => (
						<div className='row' key={spec.specialization_id}>
							<div
								style={{
									textAlign: "center",
									fontSize: "1.3rem",
									alignItems: "center",
								}}
							>
								<span>{spec.name}</span>
								<button
									onClick={() => {
										console.log("here");
									}}
								>
									delete
								</button>
							</div>

							{/* <button></button> */}
						</div>
					))}
					<div className='row'>
						<input type='text' />
					</div>
				</div>
			</Form>
		</div>
	);
}

export default AddSpecialization;
