import dbg from "debug";
const debug = dbg("controller:divideAvailability");
import moment from "moment";

const divideSlots = (slots, duration) => {
	return new Promise((resolve, reject) => {
		duration *= 60 * 1000;
		var ans = [];
		slots.forEach((s) => {
			var st = s.start_time;
			var et = s.end_time;
			while (st + duration <= et) {
				ans.push({ start_time: st, end_time: st + duration });
				st += duration;
			}
		});

		// ans = ans.map((a) => {
		// 	return {
		// 		start_time: moment(a.start_time).format("YYYY-MM-DD HH:mm:ss"),
		// 		end_time: moment(a.end_time).format("YYYY-MM-DD HH:mm:ss"),
		// 	};
		// });
		// debug(ans);
		if (ans.length == 0) {
			reject({ success: false, message: "No new slots" });
		}
		resolve({ success: true, data: { newSlots: ans } });
	});
};
export default divideSlots;
