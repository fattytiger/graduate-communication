//app.js
App({
  onLaunch: function () {
    this.globalData = {}
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    //init global data
    const db = wx.cloud.database()

    wx.cloud.callFunction({
      name:'init_page',
      success:(result)=>{
        this.globalData.openid = result.result.openid

        db.collection('user_collection').where({
          openid:this.globalData.openid
        }).get().then(document => {
          this.globalData.nickname = document.data[0].nickname
        })
      }
    }) 
  }
})
