import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import {Button} from "react-bootstrap";
import doctorAppointmentsAPI from "../../../api/doctorAppointmentsAPI";

export default function Appointment() {
    const auth = useSelector((state) => state.auth);
	const history = useHistory();
    useEffect(() => {
		if (!(auth.isauth && auth.type === 1)) {
			history.push("/home");
		}
		else{
			doctorAppointmentsAPI({
				token: auth.token
			}).then((res) => {
				if (res.reply) {
					var tmp1 = {dataSource: res.appointments};
				} else {
					alert(res.data.msg + "\nYou will be redirected to Home.");
					setTimeout(history.push("/home"), 4000);
				}
			})
		}
		
	}, [])
    return (
        <div>
            
        </div>
    )
}
