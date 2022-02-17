import dbg from "debug";
const debug = dbg("controller:getAppointmentTime");

const getAvailableTime = (sch, app) => {
	sch = sch.map((dt) => {
		return {
			start_time: Date.parse(dt.start_time),
			end_time: Date.parse(dt.end_time),
		};
	});
	app = app.map((dt) => {
		return {
			start_time: Date.parse(dt.start_time),
			end_time: Date.parse(dt.end_time),
		};
	});
	if (sch.length == 0) return sch;

	var ans = [];
	var st = sch[0].start_time;
	var tp = sch[0];

	//console.log(sch);
	//console.log(app);
	sch.forEach((sh) => {
		ans.push({ time: sh.start_time, type: 1 });
		ans.push({ time: sh.end_time, type: 0 });
	});
	app.forEach((sh) => {
		ans.push({ time: sh.start_time, type: 0 });
		ans.push({ time: sh.end_time, type: 1 });
	});
	ans.sort((a, b) => {
		if (a.time != b.time) return a.time > b.time ? 1 : a.time < b.time ? -1 : 0;

		return a.type < b.type ? 1 : a.type < b.type ? -1 : 0;
	});
	//console.log(ans);
	var ret = [];
	var n = ans.length;
	var st = null,
		et = null;
	for (var i = 0; i < n; i++) {
		if (ans[i].type == 1) {
			st = ans[i].time;
		} else {
			et = ans[i].time;
		}
		if (st && et) {
			if (st < et) {
				ret.push({
					start_time: st,
					end_time: et,
				});
				st = et = null;
			} else st = et = null;
		}
	}
	//console.log(typeof ans[0].start_time);
	//console.log(ret);
	return ret;
};
export const removePatientTime = (avai, pat) => {
	pat = pat.map((dt) => {
		return {
			start_time: Date.parse(dt.start_time),
			end_time: Date.parse(dt.end_time),
		};
	});
	// debug(avai);
	// debug(pat);
	var i = 0;
	var j = 0;
	while (i < avai.length && j < pat.length) {
		if (pat[j].end_time <= avai[i].start_time) {
			j++;
			continue;
		}
		if (
			pat[j].start_time <= avai[i].start_time &&
			pat[j].end_time > avai[i].start_time
		) {
			if (pat[j].end_time >= avai[i].end_time) {
				avai.splice(i, 1);
			} else {
				avai[i].start_time = pat[j].end_time;
				j++;
			}
		} else if (
			pat[j].start_time > avai[i].start_time &&
			pat[j].end_time < avai[i].end_time
		) {
			var st = avai[i].start_time,
				et = pat[j].start_time;
			avai[i].start_time = pat[j].end_time;
			avai.splice(i, 0, { start_time: st, end_time: et });
			j++;
		} else if (
			pat[j].start_time > avai[i].start_time &&
			pat[j].start_time < avai[i].end_time &&
			pat[j].end_time >= avai[i].end_time
		) {
			avai[i].end_time = pat[j].start_time;
			i++;
		} else break;
	}
	return avai;
};
const getAppointmentTime = (
	schedule,
	docappointment,
	patappointment,
	duration
) => {
	return new Promise((resolve, reject) => {
		var availability = getAvailableTime(schedule, docappointment);
		if (patappointment.length)
			availability = removePatientTime(availability, patappointment);
		// debug(docappointment);
		// debug("pat");
		// debug(patappointment);
		// debug("avai");
		//debug(availability);
		var n = availability.length;
		var ans = {
			start_time: null,
			end_time: null,
		};
		for (var i = 0; i < n; i++) {
			if (availability[i].end_time - availability[i].start_time >= duration) {
				ans.start_time = availability[i].start_time;
				ans.end_time = availability[i].start_time + duration;
				break;
			}
		}
		if (ans.start_time != null && ans.end_time != null)
			resolve({
				success: true,
				message: "Appointment time returned successfully",
				data: { appointment_time: ans },
			});
		else {
			resolve({
				success: false,
				message: "Doctor is not available right now",
			});
		}
	});
};

export default getAppointmentTime;
