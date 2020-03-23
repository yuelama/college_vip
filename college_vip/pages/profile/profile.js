// pages/profile/profile.js

let apps = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAvatar:'../../../images/icon.png',
	userid:'',
    userName:'难眠'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	   let that = this;
    // 获得当前登录用户
    wx.showLoading({
      title: '获取登录状态',
    })
     //var openid = wx.getStorageSync('userid');	
   //const user = AV.User.current();
   
    // 调用小程序 API，得到用户信息
   
	apps.util.request({
	  'url': 'entry/wxapp/getuserprofile',
	  header: {
	    'content-type': 'application/json' // 默认值
	  },
	
	  success(res){
		  console.log(res)
		  var userdata = [];
		  for(var i=0;i<res.data.data.userprofile.length;i++){
			  userdata = res.data.data.userprofile[i];
		  }
		  
		 that.setData({
		    userAvatar: userdata.headimg,
		    userName:userdata.nickname
		  }) 
		  
	  }
		       
	  })     
	
	
    /* wx.getUserInfo({
      success: ({ userInfo }) => {
        // 更新当前用户的信息
        user.set(userInfo).save().then(user => {
          // 成功，此时可在控制台中看到更新后的用户信息
          wx.hideLoading()
          apps.globalData.userInfo = user.toJSON();
          console.log(apps.globalData.userInfo)
          that.setData({
            userAvatar: userInfo.avatarUrl,
            userName: userInfo.nickName
          })
        }).catch((error) => {
          console.error(error)
          wx.hideLoading()
        });
      },
      fail: (error) => {
        console.error(error)
        wx.hideLoading()
      }
    }); */
  },

  onShareAppMessage: function (res) {
    return {
      title: '难眠',
    }
  }

})