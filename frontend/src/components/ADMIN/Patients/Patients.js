import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../../store/auth";
import { Table } from "react-bootstrap";
import getPatientsAPI from "../../../api/adminAPI/getPatientsAPI";
function Patients() {
	const auth = useSelector((state) => state.auth);
	//const history = useHistory();
	const dispatch = useDispatch();
	const [patientDetails, setPatientDetails] = useState([]);
	useEffect(() => {
		dispatch(setLoading({ loading: true }));
		getPatientsAPI({ token: auth.token })
			.then((response) => {
				console.log(response);
				if (response.success) {
					console.log(response.data);
					setPatientDetails(response.data.patient);
					//setDisplayDoctors(res.data.doctor);
					//setPages(Math.ceil(res.data.doctor.length / dataLimit));
					//console.log(Math.ceil(res.data.doctor.length / dataLimit));
				}
			})
			.finally(() => {
				dispatch(setLoading({ loading: false }));
			});
	}, [auth.isauth]);
	return (
		<div>
			<Table striped bordered hover responsive='lg'>
				<thead style={{ textAlign: "center" }}>
					<tr>
						<th>Patient UserName</th>
						<th>Patient Name</th>
						<th>Email Id</th>
						<th>Phone No</th>
					</tr>
				</thead>
				<tbody style={{ textAlign: "center" }}>
					{patientDetails.map((dd) => (
						<tr>
							<td>{dd.username}</td>
							<td>
								{dd.first_name} {dd.last_name}
							</td>
							<td>{dd.email}</td>
							<td>{dd.phone}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default Patients;
