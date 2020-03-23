// pages/comment/comment.js
let apps = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
	newsid:'',
	newsdata:[],
	
    commenttext:'',
    createdate:'',
    username:'',
    userAvatar:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    
	
	
    this.setData({
      commenttext: options.commenttext,
      createdate: options.createdate,
      username: options.username,
      userAvatar: options.userAvatar
    })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

  	
  },
  

  
})