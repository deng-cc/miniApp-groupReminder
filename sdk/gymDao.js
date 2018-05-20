var db = require("./dbInfo.js");

function listAllGym(success, fail) {
	let t_gym = new wx.BaaS.TableObject(db.tid_gym);
	t_gym.find().then(res => { success(res) }, err => { fail(err) });
}

module.exports = {
	listAllGym: listAllGym
}