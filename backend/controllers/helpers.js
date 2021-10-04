export const parseDateArray = (ans) => {
	ans = ans.map((a) => {
		var st = new Date(a.start_time);
		var et = new Date(a.end_time);
		return { ...ans, start_time: st.toString(), end_time: et.toString() };
	});
	return ans;
};

export const getAvailableTime = (sch, app) => {
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
	//if (sch.length == 0 || app.length == 0) return sch;
	var schit = 0,
		appit = 0;
	var ans = [];
	var st = sch[0].start_time;
	var tp = sch[0];

	console.log(sch);
	console.log(app);
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
	console.log(ans);
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
					start_time: new Date(st).toString(),
					end_time: new Date(et).toString(),
				});
				st = et = null;
			} else st = et = null;
		}
	}
	//console.log(typeof ans[0].start_time);
	//console.log(ret);
	return ret;
};
