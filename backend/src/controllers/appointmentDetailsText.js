import moment from "moment";

const appointmentDetailsText = (appointment_details) => {
	var txt;
	txt =
		"Appointment Details: \n" +
		"\tCase: " +
		appointment_details.case_description +
		"\n";
	if (appointment_details.start_time) {
		txt +=
			"\tOn:     " +
			moment(appointment_details.start_time).format("LL") +
			"\n" +
			"\tFrom: " +
			moment(appointment_details.start_time).format("hh:mm A") +
			"\n" +
			"\tTo:     " +
			moment(appointment_details.end_time).format("hh:mm A") +
			"\n";
	} else {
		txt +=
			"\tPreferred Date: " +
			moment(appointment_details.preferred_date).format("LL");
	}
	return txt;
};
export default appointmentDetailsText;
