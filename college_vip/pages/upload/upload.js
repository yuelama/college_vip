// pages/upload/upload.js
import { chooseImage,upload} from '../../util/image.js';
let apps = getApp();

let that;
let date;
let imageUrl;
var article = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: '',
    text: '',
    hasChooseImage:false,
	
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
	  var that =this;
   /* that = this
    date = new Date().getTime();
    imageUrl = '' */
	
	

 },
 
 /**
  * 生命周期函数--监听页面显示
  */
 onShow: function () {
	 var that =this;		 
	/* apps.util.request({
	  'url': 'entry/wxapp/getuserid',
	  header: {
	    'content-type': 'application/json' // 默认值
	  },
	  success(res) {
	    console.log(res)
	   
	  }
	}) */
	//that.submitData();
 },


 //选择图片上传
/*  chooseImage: function(event) {
    let that = this;	
    wx.chooseImage({
      success: function(res) {       
        that.setData({
          hasChooseImage: true,
          imagePath: res.tempFilePaths[0]
        })
      },
    })
  }, */

 //上传活动图片
 chooseImage: function () { 
   let that = this;
 var imgurl = apps.util.url('entry/wxapp/getpicurl',{m:'college_vip'}); 
wx.chooseImage({
 success (res) {
    const tempFilePaths = res.tempFilePaths	
 		console.log(tempFilePaths)
   wx.uploadFile({
     url: imgurl, //仅为示例，非真实的接口地址
     filePath: tempFilePaths[0],
     name: 'imgfile',	
     success (res){
 			//console.log(res)
 				 var jsObject = JSON.parse(res.data);
 				console.log(jsObject)
 			 	that.setData({
 					hasChooseImage: true,
 					imagePath:jsObject.data.img
 				}) 
        }
      })
    }
   })
 }, 
  

  //获取区域颜色数据
  bindTextAreaBlur: function(event) {
    //console.log('bindTextAreaBlur:' + event.detail.value)
    this.setData({
      text: event.detail.value
    })
  },

  submitData: function(event) {
	  var that =this; 
		if (this.data.text == '' ) {
		      wx.showToast({
		        icon: 'none',
		        title: '请写点东西吧',
		      })
		      } else if (that.data.imagePath == '') {
		        wx.showToast({
		          icon: 'none',
		          title: '请选择图片',
		        })
		      } else {
		        this.uploadText();
		      }
		    
  },

  uploadText:function(){
	 var that = this; 
     var content = that.data.text;
     var picurl = that.data.imagePath;  
	 this.date = new Date().getTime();
  

     apps.util.request({
     		  'url': 'entry/wxapp/getnews',
     		  header: {
     		    'content-type': 'application/json' // 默认值
     		  },
     	data:{
			content:that.data.text,
		    picurl:that.data.imagePath,
			datetime:new Date().getTime(),	
			openid:wx.getStorageSync('userid'),
			  },
        success(res){
			console.log(res)
			if(content){
				wx.showToast({
				      title: '发布成功',
				      icon: 'success',
				      duration: 1000
				    })
				 that.setData({
							content: '',
							picurl:'',
			              })
				setTimeout(function () {
				  wx.switchTab({
				    url: '/college_vip/pages/home/home',
				  })
				}, 2000) 
			}else{
				wx.showToast({
				      title: '发布失败',
				      icon: 'fail',
				      duration: 1000
				    })
				wx.switchTab({
				    url: '/college_vip/pages/upload/upload',
				  })
				
			}
			
			
		}
						
	})					
  },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    }

})