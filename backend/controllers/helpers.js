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
	if (sch.length == 0 || app.length == 0) return sch;
	var schit = 0,
		appit = 0;
	var ans = [];
	var st = sch[0].start_time;
	var tp = sch[0];

	console.log(sch);
	console.log(app);
	while (schit < sch.length && appit < app.length) {
		//console.log(schit);
		if (
			st <= app[appit].start_time &&
			sch[schit].end_time >= app[appit].start_time
		) {
			//console.log(st);
			if (st != app[appit].start_time) {
				tp.start_time = st;
				tp.end_time = app[appit].start_time;
				ans.push(tp);
				st = app[appit].end_time;
				appit++;
			} else {
				st = app[appit].end_time;
			}
		} else {
			if (st != sch[schit].end_time) {
				tp.start_time = st;
				tp.end_time = sch[schit].end_time;
				ans.push(tp);
				schit++;
				if (schit < sch.length) st = sch[schit].start_time;
			}
		}
	}
	//console.log(typeof ans[0].start_time);
	ans = ans.map((a) => {
		var st = new Date(a.start_time);
		var et = new Date(a.end_time);
		return {
			start_time: st.toString(),
			end_time: et.toString(),
		};
	});
	return ans;
};
