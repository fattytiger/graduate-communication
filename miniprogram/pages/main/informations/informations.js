// pages/main/informations/informations.js
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
    informations:[],
    flagNum:0
  },
  onLoad: function (options) {
    db.collection('information_collection').get().then(result => {
      console.log(result)
      this.data.informations = result.data
      this.setData({
        informations:this.data.informations
      })
    })
  },
  onPullDownRefresh: function () {

    db.collection('information_collection').get().then(result => {
      this.data.informations = result.data
      this.setData({
        informations:this.data.informations
      })
      wx.stopPullDownRefresh({
        success:()=>{
          this.data.title = ""
          this.data.textareaValue = ''
          this.data.flagNum = 0
          this.setData({
            title:this.data.title,
            textareaValue:this.data.textareaValue,
            flagNum:this.data.flagNum
          })
          //hide the update loading
          wx.hideLoading()
        }
      })
    })
  },

  inputTitle:function(e){
    this.data.title = e.detail.value
    this.setData({
      title:this.data.title
    })
  },

  inputTextContent:function(e){
    this.data.textareaValue = e.detail.value
    //show the text words number
    this.setData({
      flagNum: this.data.textareaValue.length
    })
  },

  publicInfomation:function(){
    if(this.data.title === ''){
      wx.showToast({
        title: '请输入标题',
        icon:'none'
      })
      return
    }
    if(this.data.textareaValue === ''){
      wx.showToast({
        title: '请输入信息',
        icon:'none'
      })
      return
    }

    if(this.data.textareaValue.length < 10){
      wx.showToast({
        title: '信息不得小于10个字',
        icon:'none'
      })
      return
    }
    let date = new Date()
    let transferdata = transferDate.transferDate(date)

    wx.showLoading({
      title: '发表中',
    })

    db.collection('information_collection').add({
      data:{
        title:this.data.title,
        desc:this.data.textareaValue,
        time:transferdata,
        author:app.globalData.nickname,
        comments:[]
      }
    }).then(result => {
      //hide the publish message loading 
      wx.hideLoading({
        success:function(){
          //start refresh this page
          wx.startPullDownRefresh({
            success:function(){
              //show the update loading
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