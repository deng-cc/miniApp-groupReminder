

function findUser(userId, success, fail) {
	let user = new wx.BaaS.User();
	user.get(userId).then(
		res => {
			console.log("The user's information is:")
			console.log(res);
			success(res);
		},
		err => {
			fail(err);
		}
	)
}


module.exports = {
	findUser: findUser
}