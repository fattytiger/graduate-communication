const md5 = require('../../utils/md5')
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: true,
    nickname: '',
    password: '',
    school: ''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  changePageStatus:function(){
    //set nickname and password as empty
    this.data.nickname = ''
    this.data.password = ''
    this.setData({
      nickname:'',
      password:'',
      isLogin:false
    })
  },

  inputNickname: function (e) {
    //set nickname 
    this.data.nickname = e.detail.value
  },
  inputPassword: function (e) {
    //set password
    if (e.detail.value === '') {
      return
    }
    this.data.password = md5.hexMD5(e.detail.value)
  },
  inputSchool: function (e) {
    //set school
    this.data.school = e.detail.value
  },

  regist: function () {
    //judge the nickname value
    if (this.data.nickname === '') {
      wx.showToast({
        title: '昵称不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    //judge the password value
    if (this.data.password === '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }

    //judge the school value
    if (this.data.school === '') {
      wx.showToast({
        title: '院校不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.userRegist()
  },
  login:function(){
    //judge the nickname value
    if (this.data.nickname === '') {
      wx.showToast({
        title: '昵称不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    //judge the password value
    if (this.data.password === '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.userLogin()
  },

  userRegist: function () {
    wx.showLoading({
      title: '请稍后'
    })

    db.collection('user_collection').add({
      data: {
        nickname: this.data.nickname,
        password: this.data.password,
        school: this.data.school,
        openid: app.globalData.openid
      },
      success:result => {
        wx.hideLoading({
          success: () => {
            //set password as empty
            this.data.password = ''
            //set username
            this.setData({
              nickname:this.data.nickname,
              isLogin:true,
              password:this.data.password
            })
          },
        })
        
      },
      fail:reson => {
        return reson
      }
    })
  },
  userLogin:function(){
    wx.showLoading({
      title: 'title',
    })
    db.collection('user_collection').where({
      openid:app.globalData.openid,
      nickname:this.data.nickname,
      password:this.data.password
    }).get().then(document => {
      //can not find the user name
      if(document.data.length === 0){
        //hide loading
        wx.hideLoading({
          success:function(){
            //show error toast
            wx.showToast({
              title: '用户名或者密码错误',
              icon:'none'
            })
          }
        })
      }
      if(document.data.length !== 0){
        wx.hideLoading({
          success:() => {
            console.log(document.data)
            wx.switchTab({
              url: '/pages/main/experience/experience'
            })
          }
        })
      }
    })
  }
})