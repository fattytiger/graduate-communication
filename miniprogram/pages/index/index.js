Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:true
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  intomain:function(){
    console.log('clicked')
    wx.switchTab({
      url: '/pages/main/experience/experience',
    })
  }
})