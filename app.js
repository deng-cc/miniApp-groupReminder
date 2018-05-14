
App({
	onLaunch(){
		//引入知晓云
		require("./sdk/sdk-v1.4.0.js");
		//初始化sdk
		let clientID = "";
		wx.BaaS.init(clientID);
	},
	globalData: {

	}
})