var db = require("./dbInfo.js");

function listNotice(date, success, fail) {
	let t_lesson = new wx.BaaS.TableObject(db.tid_notice);
	let query = new wx.BaaS.Query();
	query.compare("startTime", "<=", date);
	query.compare("endTime", ">=", date);
	t_lesson.setQuery(query).find().then(res => { success(res) }, err => { fail(err) });
}

module.exports = {
	listNotice: listNotice
}