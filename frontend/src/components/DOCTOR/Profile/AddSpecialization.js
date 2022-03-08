import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Table, Dropdown } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import getDoctorSpecializationAPI from "../../../api/getDoctorSpecializationAPI";
import getSpecializationAPI from "../../../api/getSpecializationAPI";
import addSpecializationAPI from "../../../api/addSpecializationAPI";
import removeDoctorSpecializationAPI from "../../../api/removeDoctorSpecializationAPI";
function AddSpecialization() {
	const [specialization, setSpecialization] = useState([]);
	const [allSpecializations, setAllSpecializations] = useState([]);
	const [selSpec, setSelSpec] = useState(1);
	const [newSpec, setNewSpec] = useState("");
	const [specChange, setSpecChange] = useState(false);
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
				if (response.data.specialization.length == 0) setSelSpec(0);
				else setSelSpec(response.data.specialization[0].specialization_id);
				console.log(response.data);
			}
		});
		setSpecChange(false);
	}, [auth.isauth, specChange]);
	// useState(() => {
	// 	console.log(auth.token);

	// }, [auth.isauth]);
	const addSpecialization = () => {
		console.log(newSpec);
		var spec =
			selSpec == 0
				? newSpec
				: allSpecializations.find((spec) => spec.specialization_id == selSpec)
						.name;
		addSpecializationAPI({
			token: auth.token,
			specialization: spec,
		})
			.then((response) => {
				console.log(response);
				if (response.success) {
					setSpecChange(true);
					setSelSpec(1);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const removeSpecialization = (spec) => {
		console.log(spec);
		removeDoctorSpecializationAPI({
			token: auth.token,
			specialization_id: spec.specialization_id,
		})
			.then((response) => {
				console.log(response);
				if (response.success) {
					setSpecChange(true);
					//setSelSpec(1);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		console.log(selSpec);
	}, [selSpec]);
	return (
		<div>
			<h2>Add Specialization</h2>
			{selSpec == 0 ? (
				<input
					type='text'
					value={newSpec}
					onChange={(e) => setNewSpec(e.target.value)}
				/>
			) : (
				<select value={selSpec} onChange={(e) => setSelSpec(e.target.value)}>
					<option value={0}>Add new</option>
					{allSpecializations.map((spec) => (
						<option
							value={spec.specialization_id}
							// onSelect={() => {
							// 	setSpecId(spec.specialization_id);
							// }}
						>
							{spec.name}
						</option>
					))}
				</select>
			)}
			<button
				onClick={() => {
					addSpecialization();
				}}
			>
				Add
			</button>
			<Table striped bordered hover responsive='lg'>
				<thead style={{ textAlign: "center" }}>
					<tr>
						<th>Specialization</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody style={{ textAlign: "center" }}>
					{specialization.map((spec) => (
						<tr key={spec.specialization_id}>
							<td>{spec.name}</td>
							<td>
								<button
									onClick={() => {
										removeSpecialization(spec);
									}}
								>
									<FaTrash />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default AddSpecialization;
