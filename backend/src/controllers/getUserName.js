import moment from "moment";
const num = (n) => {
	var tp = n.toString();
	while (tp.length < 4) {
		tp = "0" + tp;
	}
	return tp;
};
const getUserName = (type, user_id, created) => {
	var id = "";
	if (type == "patient") id += "P";
	else if (type == "doctor") id += "D";
	else if (type == "admin") id += "A";
	id += moment(created).format("YYYY");
	id += num(user_id);
	return id;
};
export default getUserName;
