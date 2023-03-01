import { getPhoneLogin } from '@/request/api/home'
import { getMusicLyric } from '@/request/api/item'
import { createStore } from 'vuex'

export default createStore({
  state: {
    playList: [{
      al: {  //播放列表
        id:94650688,
        name: "Illusion/Ultraviolet",
        pic:109951165280325550,
        picUrl:"https://p1.music.126.net/b9ZcyGCYPaRl7dHunpF_Ng==/109951165280325554.jpg",
        pic_str:"109951165280325554",
      },
      id: 1474924007,
      ar: [{
        id: 12120673,
        name: "UltraV",
      }]
    }],
    playListIndex: 0, //默认下标为0
    isbtnShow: true,//暂停按钮显示
    detailShow: false, //歌曲详情页
    lyricList:{}, //歌词部分
    isLyricShow:false,
    isLogin:false,
    isFooterMusic:true,//底部组件
  },
  getters: {
  },
  mutations: {

    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value
    },

    updatePlayList: function (state, value) {
      state.playList = value
    },

    updatePlayListIndex: function (state, value) {
      state.playListIndex = value
    },
    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow
    },
    updateLyricList:function(state,value){
      state.lyricList=value
    },
    updateIsLyricShow: function (state) {
      state.isLyricShow = !state.isLyricShow
    }


  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value)
      console.log(res);
      context.commit('updateLyricList',res.data.lrc)
    },
    getLogin:async function(context,value){
      let res=await getPhoneLogin(value)
      console.log(res);
    },
  },
  modules: {
  }
})
