// pages/main/experience_artical/experience_artical.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    desc:'',
    author:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //get artical id
    let articalID = options.artical_id
    db.collection('experience_collection').where({
      _id:articalID
    }).get().then(result => {
      console.log(result)
      //get data by object ID
      let finddata = result.data[0]
      //render the page by the received data
      this.data.title = finddata.title
      this.data.desc  = finddata.desc
      this.data.author = finddata.author
      this.setData({
        title:this.data.title,
        desc:this.data.desc,
        author:this.data.author
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