import dbg from "debug";
const debug = dbg("controller:mergeAvailability");

const mergeAvailability = (schedule, start_time, end_time) => {
	return new Promise((resolve, reject) => {
		var st = false,
			et = false;

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
				data: { st, et, start_time, end_time },
			});
		} else {
			reject({ success: false, message: "No new Availability" });
		}
	});
};
export default mergeAvailability;
