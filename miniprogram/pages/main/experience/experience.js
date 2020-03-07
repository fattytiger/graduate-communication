// pages/main/experience/experience.js
const app = getApp()
const db = wx.cloud.database()
const transferDate = require('../../../utils/formateDate')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaValue:'',
    title:'',
    experiences:[],
    flagNum:0
  },

  
  onLoad: function (options) {
    db.collection('experience_collection').get().then(result => {
      console.log(result)
      this.data.experiences = result.data
      this.setData({
        experiences:this.data.experiences
      })
    })
  },
  onPullDownRefresh:function(){
    db.collection('experience_collection').get().then(result => {
      this.data.experiences = result.data
      this.setData({
        experiences:this.data.experiences
      })
      wx.stopPullDownRefresh({
        success:()=>{
          this.data.title = ""
          this.data.textareaValue = ''
          this.setData({
            title:this.data.title,
            textareaValue:this.data.textareaValue
          })
          wx.hideLoading()
        }
      })
    })
  },


  inputTextContent:function(e){
    this.data.textareaValue = e.detail.value
    //show the text words number
    this.setData({
      flagNum: this.data.textareaValue.length
    })
  },

  inputExpeTitle:function(e){
    this.data.title = e.detail.value
  },

  addExperience:function(){
    //judge the title is empty or not 
    if(this.data.title === ''){
      wx.showToast({
        title: '请填写标题',
        icon:'none'
      })
      return
    }

    //judege the data is empty or not
    if(this.data.textareaValue === ''){
      wx.showToast({
        title: '请填写经验',
        icon:'none'
      })
      return
    }

    if(this.data.textareaValue.length < 10){
      wx.showToast({
        title: '输入字数不小于10',
        icon:'none'
      })
      return
    }
    wx.showLoading({
      title: '请稍等',
    })
    
    const date = new Date()
    const transferdata = transferDate.transferDate(date)

    db.collection('experience_collection').add({
      data:{
        title:this.data.title,
        desc:this.data.textareaValue,
        time:transferdata,
        author:app.globalData.nickname
      }
    }).then(result => {
      wx.hideLoading({
        success:function(){
          wx.startPullDownRefresh({
            success:function(){
              wx.showLoading({
                title: '开始更新',
              })
            }
          })
        }
      })
    })
  }
})