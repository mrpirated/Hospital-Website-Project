import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Table, Dropdown } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import getDoctorQualificationAPI from "../../../api/getDoctorQualificationAPI";
import getQualificationAPI from "../../../api/getQualificationAPI";
import addQualificationAPI from "../../../api/addQualificationAPI";
import removeDoctorQualificationAPI from "../../../api/removeDoctorQualificationAPI";
function AddQualification() {
	const [qualification, setQualification] = useState([]);
	const [allQualifications, setAllQualifications] = useState([]);
	const [selSpec, setSelSpec] = useState(1);
	const [newSpec, setNewSpec] = useState("");
	const [specChange, setSpecChange] = useState(false);
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	useEffect(() => {
		getDoctorQualificationAPI({ token: auth.token }).then((response) => {
			if (response.success) {
				setQualification(response.data.qualification);
				console.log(response.data);
			}
		});
		getQualificationAPI({ token: auth.token }).then((response) => {
			console.log(response);
			if (response.success) {
				setAllQualifications(response.data.qualification);
				if (response.data.qualification.length == 0) setSelSpec(0);
				else setSelSpec(response.data.qualification[0].qualification_id);
				console.log(response.data);
			}
		});
		setSpecChange(false);
	}, [auth.isauth, specChange]);
	// useState(() => {
	// 	console.log(auth.token);

	// }, [auth.isauth]);
	const addQualification = () => {
		console.log(newSpec);
		var spec = selSpec == 0 ? newSpec : allQualifications[selSpec - 1].name;
		addQualificationAPI({
			token: auth.token,
			qualification: spec,
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
	const removeQualification = (spec) => {
		console.log(spec);
		removeDoctorQualificationAPI({
			token: auth.token,
			qualification_id: spec.qualification_id,
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
			<h2>Add Qualification</h2>
			{selSpec == 0 ? (
				<input
					type='text'
					value={newSpec}
					onChange={(e) => setNewSpec(e.target.value)}
				/>
			) : (
				<select value={selSpec} onChange={(e) => setSelSpec(e.target.value)}>
					<option value={0}>Add new</option>
					{allQualifications.map((spec) => (
						<option
							value={spec.qualification_id}
							// onSelect={() => {
							// 	setSpecId(spec.Qualification_id);
							// }}
						>
							{spec.name}
						</option>
					))}
				</select>
			)}
			<button
				onClick={() => {
					addQualification();
				}}
			>
				Add
			</button>
			<Table striped bordered hover responsive='lg'>
				<thead style={{ textAlign: "center" }}>
					<tr>
						<th>Qualification</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody style={{ textAlign: "center" }}>
					{qualification.map((spec) => (
						<tr key={spec.Qualification_id}>
							<td>{spec.name}</td>
							<td>
								<button
									onClick={() => {
										removeQualification(spec);
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

export default AddQualification;
