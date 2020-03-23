// pages/home/home.js
import http from '../../util/request.js';
//var util = require('../../../utils/util.js');

let that = this; 
//var util = require('../../utils/util.js');
let apps = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles:[],  //获取新闻内容信息
   // currentIndex:-1,
    //0表示未播放，1表示正在播放，2表示播放暂停
   // playState:0,
    newsid:'',
    currentExpandIndex:-1//当前展开的Index
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  },

  onShow: function () {
     this.getArticleData();
    wx.startPullDownRefresh();
  },

  getArticleData:function(){
	  var that =this;
	  apps.util.request({
		  'url': 'entry/wxapp/getnewsinfo',
		  	  header: {
		  	    'content-type': 'application/json' // 默认值
		  	  },
			  success(res) {				  				  				  
			     that.setData({
					 articles:res.data.data.newsinfo
					 
				 })
							 
				  wx.stopPullDownRefresh();
			  }
	  })
   
  },

//跳转到详情页面
  jumpToDetailCmt:function(event){
    // console.log(event)
     wx.navigateTo({
     	url:'/college_vip/pages/detail/detail?id='+event.currentTarget.dataset.newsid,
     })
  },



  expandText:function(event){
      console.log(event)
      this.setData({
        currentExpandIndex: event.currentTarget.dataset.index
      })
  },

  previewBigImage:function(event){
    console.log(event)
    wx.previewImage({
      urls: [event.currentTarget.id] // 需要预览的图片http链接列表
    })
  },

//微信下拉刷新
  onPullDownRefresh:function(event){
    this.getArticleData();
  },
  
  //发布信息
 /*  jumpToUpload:function(event){
      wx.navigateTo({
        url: '/college_vip/pages/upload/upload',
      })
    }, */

 //发布评论
  /* comUpload:function(event){
	  console.log(event)
	  wx.navigateTo({
	  	url:'/college_vip/pages/comment/comment?id='+event.currentTarget.dataset.newsid,
	  })	  
    }, */
	
 //发起约会
   postLove:function(event){
      wx.navigateTo({
        url: '/college_vip/pages/write/write',
      })
    }, 




//微信小程序之页面分享
  onShareAppMessage: function (res) {
    return {
      title: '难眠',
    }
  }

})