import mergeAvailability from "../mergeAvailability";

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
test("there should be no overlapping", () => {
	var st = Math.floor(Math.random() * 1000 + 1);
	var et = Math.floor(Math.random() * 1000 + 1);
	var sch = randomschedule();
	// console.log(sch);
	// console.log(st);
	// console.log(et);
	return mergeAvailability(sch, st, et).then((response) => {
		console.log(response);
		expect(response.success).toBe(true);
	});
});
