var db = require("./dbInfo.js");

function listInfo(gymId, date, success, fail) {
	let t_info = new wx.BaaS.TableObject(db.tid_miniLessonInfo);
	let query = new wx.BaaS.Query();
	query.compare("gymId", "=", gymId);
	query.compare("startTime", "<=", date);
	query.compare("endTime", ">=", date);
	t_info.setQuery(query).find().then(res => { success(res) }, err => { fail(err) });
}

module.exports = {
	listInfo: listInfo
}