const innerAudioContext = wx.createInnerAudioContext()

Page({
  data: {
    text: '',
    playbtn:'播放',
    query:'',
    title:'',
    author:''
  },
  onUnload() {
    innerAudioContext.stop()
  },
  onHide(){
    innerAudioContext.stop()
  },
  onShareAppMessage() {
    return {
      title: '快来听听'+this.data.author+'的AI写歌大作:'+this.data.title,
      imageUrl: 'http://cdn.woyaoxiege.cn/music.png',
      path:'/pages/share/share?'+this.data.query
    }
  },
  onShareTimeline(){
    return {
      title: '快来听听'+this.data.author+'的AI写歌大作:'+this.data.title,
      imageUrl: 'http://cdn.woyaoxiege.cn/music.png',
      path:'/pages/share/share?'+this.data.query
    }
  },
  onLoad: function (options) {
    const that=this
    var lrc,mp3
    lrc=options.lrcUrl
    mp3=options.mp3Url
    this.setData({
      query:'lrcUrl='+options.lrcUrl+'&mp3Url='+options.mp3Url
    })
    
    
    wx.request({
      url: lrc,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=> {
        console.log(res)
        let lrc = res.data.split(';')
        let title = lrc[0];
        let author = lrc[1];
        let geci = lrc[2];
        geci = geci.replace(/,/g,"\n");
        this.setData({
          text: geci,
          title:title,
          author:author
        })
      }
    })
    innerAudioContext.autoplay=true
    innerAudioContext.src = mp3
    innerAudioContext.onEnded(() => {
      that.setData({
        playbtn:'播放'
      })
    })
    innerAudioContext.onPlay(() => {
      that.setData({
        playbtn:'暂停'
      })
    })
    
  },
  audioPlay: function () {
    if(innerAudioContext.paused){
      innerAudioContext.play()
      this.setData({
        playbtn:'暂停'
      })
    }else{
      innerAudioContext.pause()
      this.setData({
        playbtn:'播放'
      })
    }
  },
  backToIndex: function(){
    innerAudioContext.stop()
    wx.redirectTo({
      url: '/pages/index/index'
    })
  }


})