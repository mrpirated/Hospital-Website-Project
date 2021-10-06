import React, {useEffect} from "react";


function Doctors() {
	useEffect(() => {
		sessionStorage.setItem("lastPage", "/patient/doctors");
	}, []);

	return <div>Doctors</div>;
}

export default Doctors;
