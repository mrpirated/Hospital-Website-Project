import dbg from "debug";
const debug = dbg("controller:mergeAvailability");
import moment from "moment";
const mergeAvailability = (schedule, start_time, end_time) => {
	return new Promise((resolve, reject) => {
		var st = false,
			et = false;
		schedule = schedule.map((sh) => {
			return {
				start_time: Date.parse(sh.start_time),
				end_time: Date.parse(sh.end_time),
			};
		});
		for (var i = 0; i < schedule.length; i++) {
			if (
				schedule[i].start_time <= start_time &&
				schedule[i].end_time >= start_time
			) {
				start_time = schedule[i].end_time;
				if (
					schedule[i].start_time <= end_time &&
					schedule[i].end_time >= end_time
				) {
					end_time = schedule[i].end_time;
				}
			} else if (
				schedule[i].start_time <= end_time &&
				schedule[i].end_time >= end_time
			) {
				end_time = schedule[i].start_time;
			}
		}
		if (start_time < end_time) {
			for (var i = 0; i < schedule.length; i++) {
				if (schedule[i].start_time == end_time) {
					et = true;
				}
				if (schedule[i].end_time == start_time) {
					st = true;
				}
			}
			resolve({
				success: true,
				message: "Got new Availability",
				data: {
					st,
					et,
					start_time: moment(start_time).format("YYYY-MM-DD HH:mm:ss"),
					end_time: moment(end_time).format("YYYY-MM-DD HH:mm:ss"),
				},
			});
		} else {
			reject({ success: false, message: "No new Availability" });
		}
	});
};
export default mergeAvailability;
