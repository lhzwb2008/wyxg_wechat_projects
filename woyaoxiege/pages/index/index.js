// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    hidden: true,
    title:'',
    author:'',
    geci:'',
    source:1,
    genre:0,
    emotion:0,
    velocity:3,
    source_a:['暖男', '正太', '娃娃','萝莉','御姐'],
    genre_a:['流行', '摇滚', '民谣', '电子'],
    emotion_a:['开心','悲伤'],
    velocity_a:['极慢','缓慢','舒缓','正常','活泼','飞快','极快']
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
  },
  loadingChange: function () {
    this.setData({
      hidden: true
    })
  },
  bindFormSubmit: function(e) {
    const english = /[\w]/g;
    if(!e.detail.value.textarea ){
      wx.showToast({
        title: '请先输入歌词',
        icon: 'none',
        duration: 1000
      })
    }else if(english.test(e.detail.value.textarea)){
      wx.showToast({
        title: '仅支持中文',
        icon: 'none',
        duration: 1500
      })
    }else{
      this.setData({
        hidden: false
      })
      wx.request({
        url: 'https://woyaoxiege.cn/code/mini_index.php', 
        data: {
          content:e.detail.value.title+";"+e.detail.value.author+";"+e.detail.value.textarea,
          source:e.detail.value.source,
          genre:e.detail.value.genre,
          emotion:e.detail.value.emotion,
          velocity:e.detail.value.velocity
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success:(res) =>{
          const mp3Url = res.data.mp3Url;
          const lrcUrl = res.data.lrcUrl;
          wx.redirectTo({
            url: '/pages/share/share?mp3Url='+mp3Url+'&lrcUrl='+lrcUrl
          })
         
        }
      })
    } 
  },
  onShareAppMessage() {
    return {
      title: '快来试试AI写歌吧',
      imageUrl: 'http://cdn.woyaoxiege.cn/music.png'
    }
  },
  try: function (e) {
    this.setData({
      title:'念奴娇赤壁',
      author:'东坡',
      geci:'大江东去浪淘尽，千古风流人物，故垒西边，人道是，三国周郎赤壁，乱石穿空，惊涛拍岸，卷起千堆雪，江山如画，一时多少豪杰'
    })
  },
  bindSourceChange: function(e) {
    this.setData({
      source: e.detail.value
    })
  },
  bindGenreChange: function(e) {
    this.setData({
      genre:e.detail.value
    })
  },
  bindEmotionChange: function(e) {
    this.setData({
      emotion:e.detail.value
    })
  },
  bindVelocityChange: function(e) {
    this.setData({
      velocity:e.detail.value
    })
  }
})