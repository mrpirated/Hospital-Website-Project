import dbg from "debug";
const debug = dbg("controller:divideAvailability");
import moment from "moment";

const divideAvailability = (slots, start_time, end_time) => {
	return new Promise((resolve, reject) => {
		slots = slots.map((st) => {
			return {
				start_time: Date.parse(st.start_time),
				end_time: Date.parse(st.end_time),
			};
		});
		var ans = [];
		// ans.push({start_time:start_time, end_time:end_time});
		ans.push({
			start_time: Date.parse(start_time),
			end_time: Date.parse(end_time),
		});
		var idx = 0;
		for (var i = 0; i < slots.length; i++) {
			if (slots[i].end_time <= ans[idx].start_time) continue;
			if (
				slots[i].end_time > ans[idx].start_time &&
				slots[i].end_time <= ans[idx].end_time
			) {
				if (slots[i].start_time > ans[idx].start_time) {
					var et1 = ans[idx].end_time;
					ans[idx].end_time = slots[i].start_time;
					ans.splice(idx + 1, 0, {
						start_time: slots[i].end_time,
						end_time: et1,
					});
					idx++;
					continue;
				} else {
					ans[idx].start_time = slots[i].end_time;
					continue;
				}
			} else if (
				slots[i].start_time >= ans[idx].start_time &&
				slots[i].start_time < ans[idx].end_time
			) {
				ans[idx].end_time = slots[i].start_time;
				continue;
			}
		}
		ans = ans.filter((a) => a.start_time < a.end_time);
		// ans = ans.map((a) => {
		// 	return {
		// 		start_time: moment(a.start_time).format("YYYY-MM-DD HH:mm:ss"),
		// 		end_time: moment(a.end_time).format("YYYY-MM-DD HH:mm:ss"),
		// 	};
		// });
		//debug(ans);
		if (ans.length == 0) {
			reject({ success: false, message: "No new slots" });
		}
		resolve({ success: true, data: { newSlots: ans } });
	});
};
export default divideAvailability;
