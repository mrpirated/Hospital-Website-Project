import mergeAvailability from "../mergeAvailability";
import { removePatientTime } from "../getAppointmentTime";
const randomschedule = () => {
	var n = Math.floor(Math.random() * 100 + 1);
	var values = [];
	var a = 1;
	var b = Math.floor(Math.random() * 100 + 1);
	for (var i = 0; i < n; i++) {
		var sch = {
			start_time: a,
			end_time: a + b,
		};
		a += b + Math.floor(Math.random() * 100 + 1);
		b = Math.floor(Math.random() * 100 + 1);
		values.push(sch);
	}
	return values;
};
// test("there should be no overlapping", () => {
// 	var st = Math.floor(Math.random() * 1000 + 1);
// 	var et = Math.floor(Math.random() * 1000 + 1);
// 	var sch = randomschedule();
// 	// console.log(sch);
// 	// console.log(st);
// 	// console.log(et);
// 	return mergeAvailability(sch, st, et).then((response) => {
// 		console.log(response);
// 		expect(response.success).toBe(true);
// 	});
// });
const checkfunc = (sch1, sch2) => {
	var i = 0,
		j = 0;
	for (j = 0; j < sch2.length; j++) {
		var sh = sch2[j];
		for (i = 0; i < sch1.length; i++) {
			if (sh.end_time <= sch1[i].start_time) break;

			if (sh.start_time >= sch1[i].end_time) continue;

			if (
				sh.start_time > sch1[i].start_time &&
				sh.start_time < sch1[i].end_time
			)
				return false;
			if (sh.end_time > sch1[i].start_time && sh.end_time < sch1[i].end_time)
				return false;
		}
	}
	return true;
};
test("testing remove patient time", () => {
	var sch1 = randomschedule();
	var sch2 = randomschedule();
	console.log(sch1);
	console.log(sch2);
	sch1 = removePatientTime(sch1, sch2);
	console.log(sch1);
	expect(checkfunc(sch1, sch2)).toBe(true);
});
