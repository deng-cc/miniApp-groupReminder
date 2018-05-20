var db = require("./dbInfo.js");

function listNotice(gymId, date, success, fail) {
	let t_notice = new wx.BaaS.TableObject(db.tid_notice);
	let query = new wx.BaaS.Query();
	query.compare("gymId", "=", gymId);
	query.compare("startTime", "<=", date);
	query.compare("endTime", ">=", date);
	t_notice.setQuery(query).find().then(res => { success(res) }, err => { fail(err) });
}

function addNotice(values, success, fail) {
	let t_notice = new wx.BaaS.TableObject(db.tid_notice);
	let notice = t_notice.create();
	notice.set(values);
	notice.save().then(res => { success(res) }, err => { fail(err) });
}

module.exports = {
	listNotice: listNotice,
	addNotice: addNotice
}