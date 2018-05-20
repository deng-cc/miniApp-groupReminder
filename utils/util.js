
const showInfo = msg => {
	wx.showToast({
		title: msg,
		icon: "none"
	});
}

const showErr = err => {
	console.log("This is some error occured:")
	console.log(err);
	wx.showToast({
		title: "Error Message:" + err.message,
		icon: "none"
	});
}


module.exports = {
	showInfo: showInfo,
	showErr: showErr
}