import React from 'react'
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";

export default function Type(props) {
    const history = useHistory();
	
    const openPatient = () => {
        history.push("/pat");
    }

    const openDoctor = () => {
        history.push("/doc");
    }

    return (
        <div>
            <Button block size='lg' type='submit' onClick={openPatient}>
                PATIENT
            </Button>
            <Button block size='lg' type='submit' onClick={openDoctor}>
                DOCTOR
            </Button>
        </div>
    )
}
