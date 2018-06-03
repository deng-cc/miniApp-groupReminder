var db = require("./dbInfo.js");

function listMiniLesson(gymId, date, success, fail) {
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);

	let t_lesson = new wx.BaaS.TableObject(db.tid_miniLesson);
	let query = new wx.BaaS.Query();
	query.compare("gymId", "=", gymId);
	query.compare("startTime", ">=", date);
	t_lesson.setQuery(query).orderBy(["startTime"]).find().then(res => { success(res) }, err => { fail(err) });
}

module.exports = {
	listMiniLesson: listMiniLesson
}