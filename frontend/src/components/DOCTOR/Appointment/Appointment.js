import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import {Button} from "react-bootstrap";
import doctorAppointmentsAPI from "../../../api/doctorAppointmentsAPI";
import {columns} from "./TableColumns";
import DataTable from '../../DataTable';

export default function Appointment() {
    const auth = useSelector((state) => state.auth);
	const history = useHistory();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
	
    useEffect(() => {
        setIsLoading(true);
		if (!(auth.isauth && auth.type === 1)) {
			history.push("/home");
		}
		else{
            const today = new Date();
            const nextDay = new Date((new Date()).valueOf() + 1000*3600*24);
            const start_date = today.toISOString().slice(0, 10);
            const end_date = nextDay.toISOString().slice(0, 10);
            const start_time = start_date + " " + "00:00:00";
            const end_time = end_date + " " + "00:00:00";
            console.log(start_time);
            console.log(end_time);
            
			doctorAppointmentsAPI({
				token: auth.token,
                start_time: start_time,
                end_time: end_time
			}).then((res) => {
				if (res.reply) {
					setData(res.appointments);
				} else {
					alert(res.data.msg + "\nYou will be redirected to Home.");
					setTimeout(history.push("/home"), 4000);
				}
			})
		}
		setIsLoading(false);
	}, [])

    const actions = [
		{
			icon: "edit",
			tooltip: "Open Appointment",
			onClick: (event, rowData) => {
				console.log(rowData);
			},
		},
	];

    return (
        <div>
			{"Date: " + new Date().toISOString().slice(0, 10)}
            <DataTable
				columns={columns}
				actions={actions}
				data={data}
                isLoading={isLoading}
			/>
        </div>
    )
}
