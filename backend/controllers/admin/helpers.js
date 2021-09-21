export const parseDateArray = (data) => {
	data = data.map((dt) => {
		return {
			start_time: Date(dt.start_time),
			end_time: Date(dt.end_time),
		};
	});
	return data;
};

export const getAvailableTime = (sch, app) => {
	var schit = 0,
		appit = 0;
	var ans = [];
	var tp = sch[0];
	while (schit < sch.length && appit < app.length) {}
	return ans;
};
