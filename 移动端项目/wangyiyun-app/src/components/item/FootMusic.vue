<template>
    <div class="FootMusic">
        <div class="footerleft" @click="updateDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div>
                <p>{{ playList[playListIndex].al.name }}</p>
                <span>横划切换{{ isbtnShow }}</span>
            </div>
        </div>

        <div class="footerRight">
            <svg class="icon" aria-hidden="true" v-if="isbtnShow" @click="play">
                <use xlink:href="#icon-fanhuijian"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-else @click="play">
                <use xlink:href="#icon-caidan1"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caidan1"></use>
            </svg>
        </div>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
    </div>

    <!-- 右侧弹出 -->
    <van-popup v-model:show="detailShow" position="right" :style="{ width: '100%', height: '100%' }">
        <MusicDetail :musicList="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow" />
    </van-popup>
</template>

<!-- <script>
export default {
    computed: {
        ...mapState(['playList', 'playListIndex', 'isbtnShow'])
    },
    methods: {
        ...mapMutations(['updateIsbtnShow'])
    }
}
</script> -->

<script setup>

import MusicDetail from "@/components/item/MusicDetail.vue";
import { getItemList } from "@/request/api/item";
import { mapMutations, mapState, useStore } from "vuex";
import { ref, watch, computed, onUpdated, onMounted } from "vue";
import { useRoute } from "vue-router";


// onMounted(() => {
//     getLyric(playList[playListIndex]?.id) //更改底部组件重新获取歌词 502 bad gateway!!!
// })
// onUpdated(() => {
//     // getLyric(playList[playListIndex].id) //更改底部组件重新获取歌词
//     store.dispatch('getLyric', id1)
// })
onMounted(()=>{
    getLyric(store.state.playList[store.state.playListIndex].id);
    store.dispatch('getLyric', store.state.playList[store.state.playListIndex].id)
})
onUpdated(()=>{
    getLyric(store.state.playList[store.state.playListIndex].id);
    store.dispatch('getLyric', store.state.playList[store.state.playListIndex].id)
})

const store = useStore()
// store.commit('updateIsbtnShow')
// function updateIsbtnShow() {
//     store.commit('updateIsbtnShow')
// }
const audio = ref('audio')


const playListIndex = computed(() => store.state.playListIndex)
const playList = computed(() => store.state.playList)
const isbtnShow = computed(() => store.state.isbtnShow)
const detailShow = computed(() => store.state.detailShow)
// const id1 = computed(() => store.state.playList[playListIndex].id)



const updateIsbtnShow = value => store.commit('updateIsbtnShow', value)
const updateDetailShow = value => store.commit('updateDetailShow', value)
const getLyric = value => store.dispatch('getLyric', value)

// function updateIsbtnShow(){
//     store.commit('updateIsbtnShow')
// }
// function updateDetailShow(){
//     store.commit('updateDetailShow')
// }


const play = () => {

    if (audio.value.paused) {
        audio.value.play()
        updateIsbtnShow(false)
        // store.commit('updateIsbtnShow',false)
    } else {
        audio.value.pause()
        updateIsbtnShow(true)
        // store.commit('updateIsbtnShow',true)

    }
    console.log(playList);

}



watch([playListIndex, playList], (newvalue, oldvalue) => { //下标改变，切换歌曲
    audio.value.autoplay = true
    if (audio.value.paused) {
        updateIsbtnShow(false)
    }
    if (isbtnShow) {
        audio.value.autoplay = true
        updateIsbtnShow(false)
    }
})

</script>


<style lang="scss" scoped>
.FootMusic {
    display: flex;
    width: 100%;
    height: 1.4rem;
    background-color: white;
    position: fixed;
    bottom: 0;
    border-top: solid 1px #999;
    justify-content: space-between;

    .footerleft {
        width: 60%;
        height: 100%;
        display: flex;
        padding: .2rem;
        justify-content: space-around;
        align-items: center;

        img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }
    }

    .footerRight {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>