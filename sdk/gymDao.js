var db = require("./dbInfo.js");
var constant = require("../data/constant.js");

function listAllGym(success, fail) {
	let t_gym = new wx.BaaS.TableObject(db.tid_gym);
	t_gym.find().then(res => { success(res) }, err => { fail(err) });
}

function initGym(execute) {
	let gymId = wx.getStorageSync(constant.KEY_GYM_ID);
	//如果首次进入（没有选择健身房）
	if (!gymId) {
		gymDao.listAllGym(
			function (res) {
				wx.setStorageSync(constant.KEY_GYM_ID, res.data.objects[0].id);
				wx.setStorageSync(constant.KEY_GYM_NAME, res.data.objects[0].name);
				execute();
			},
			function (err) {
				util.showErr(err);
			}
		);
	} else {
		execute();
	}
}

module.exports = {
	listAllGym: listAllGym,
	initGym:initGym
}