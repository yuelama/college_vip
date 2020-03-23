//index.js


//获取应用实例
let apps = getApp();

Page({
  data: {
    topics:[]
  },
  
  
  onLoad: function () {
    wx.startPullDownRefresh();
  },

  getTopicData:function(){
    var that = this
    //查询话题信息
	apps.util.request({
			  'url': 'entry/wxapp/Category',
			  	  header: {
			  	    'content-type': 'application/json' // 默认值
			  	  },
				  success(res) {
					  console.log(res)
					 var cateinfo = [];
					 for(var i=0;i<res.data.data.catedata.length;i++){
						 cateinfo = res.data.data.catedata[i];						 
					 } 
					 that.setData({
						 topics:cateinfo
					 })
					 
				  }
				  
		})
	
    /* var topicQuery = new AV.Query('Topic')
    topicQuery.descending('createdAt');
    topicQuery.find()
      .then(function (topics) {
        wx.stopPullDownRefresh()
        var tempTopics = []
        topics.forEach(function (topic) {
          topic.createdAt = moment(topic.createdAt).format('YYYY年MM月DD日 HH:mm:ss')
          tempTopics.push(topic.toJSON())
        })

        that.setData({
          topics: tempTopics
        })
        console.log(tempTopics)
      }).catch(function (error) {
        wx.stopPullDownRefresh()
        console.error(error)
      }); */
  },

  //点击事件
  jumpToDetail: function (event) {
    console.log(event)
    var topicid = event.currentTarget.dataset.topicid
    var imageurl = event.currentTarget.dataset.imageurl
    var cardtitle = event.currentTarget.dataset.cardtitle
    wx.navigateTo({
      url: '../detail/detail?topicid=' + topicid + '&imageurl=' + imageurl + '&cardtitle=' + cardtitle,
    })
  },

  onPullDownRefresh: function (event) {
    this.getTopicData();
  },

  onShareAppMessage: function (res) {
    return {
      title: '难眠',
    }
  }

})
