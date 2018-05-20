var db = require("./dbInfo.js");

function listLesson(gymId, date, success, fail) {
	let t_lesson = new wx.BaaS.TableObject(db.tid_lesson);
	let query = new wx.BaaS.Query();
	query.compare("gymId", "=", gymId);
	query.compare("year", "=", date.getFullYear());
	query.compare("month", "=", date.getMonth());
	query.compare("weekday", "=", date.getDay());
	t_lesson.setQuery(query).orderBy(["startTime"]).find().then(res => { success(res) }, err => { fail(err) });
}

module.exports = {
	listLesson: listLesson
}