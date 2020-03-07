// pages/main/mine/mine.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    experienceAmount : 0,
    informationAmount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //find the experience amount 
    db.collection('experience_collection').where({
      _openid:app.globalData.openid,
      author:app.globalData.nickname
    }).count().then(result => {
      this.data.experienceAmount = result.total
      this.setData({
        experienceAmount:this.data.experienceAmount
      })
    })
    //find the information amount
    db.collection('information_collection').where({
      _openid:app.globalData.openid,
      author:app.globalData.nickname
    }).count().then(result => {
      this.data.informationAmount = result.total
      this.setData({
        informationAmount:this.data.informationAmount
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})