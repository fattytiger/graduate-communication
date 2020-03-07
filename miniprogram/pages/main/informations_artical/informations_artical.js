// pages/main/informations_artical/informations_artical.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    author:'',
    desc:'',
    comments:[],
    textValue:'',
    flagNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //get the artical id
    this.articalID = options.artical_id

    db.collection('information_collection').where({
      _id:this.articalID
    }).get().then(result => {
      //get finddata
      let finddata = result.data[0]
      //render the page by received data
      this.data.title = finddata.title
      this.data.author = finddata.author
      this.data.desc = finddata.desc
      this.data.comments = finddata.comments
      this.setData({
        title:this.data.title,
        author:this.data.author,
        desc:this.data.desc,
        comments:this.data.comments
      })
    })
  },

  onPullDownRefresh:function(){
    db.collection('information_collection').where({
      _id:this.articalID
    }).get().then(res => {
      let finddata = res.data[0]
      this.data.comments = finddata.comments
      this.setData({
        comments:this.data.comments
      })
      //cancle loading
      wx.stopPullDownRefresh({
        success: (res) => {
          wx.hideLoading()
        },
      })
    })
  },

  inputComment:function(e){
    this.data.textValue = e.detail.value
    this.setData({
      flagNum:this.data.textValue.length
    })
  },

  addComment:function(){
    //judge the comment is empty or not
    if(this.data.textValue === ''){
      wx.showToast({
        title: '请输入评论',
      })
      return
    }
    wx.showLoading({
      title: '请稍后',
    })
    const _ = db.command
    db.collection('information_collection').doc(`${this.articalID}`).update({
      data:{
        comments:_.push({
          author:app.globalData.nickname,
          comment:this.data.textValue
        })
      }
    }).then(res => {
      //hide loading
      wx.hideLoading({
        success: (res) => {
          wx.startPullDownRefresh({
            success: (res) => {
              wx.showLoading({
                title: '正在更新',
              })
            },
          })
        },
      })
      console.log(res)
    })
  },
})