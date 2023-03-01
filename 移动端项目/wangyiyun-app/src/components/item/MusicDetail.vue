<template>
    <img :src="musicList.al.picUrl" alt="" class="bgimg">
    <div class="detailTop">
        <div class="detailTopLeft">
            <svg class="icon" aria-hidden="true" @click="isLyricShow=false,updateDetailShow()">
                <use xlink:href="#icon-caidan1"></use>
            </svg>
            <div class="leftMarquee">
                <p>
                    <Vue3Marquee behavior="" direction="">{{ musicList.al.name }}</Vue3Marquee>
                </p>
                <span v-for="item in musicList.ar" :key="item">
                    {{ item.name }}
                </span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-caidan1"></use>
                </svg>
            </div>
        </div>
        <div class="detailTopRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caidan1"></use>
            </svg>
        </div>
    </div>
    <div class="detailContent" v-show="!isLyricShow">
        <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{ img_needle_active: !isbtnShow }">
        <img src="@/assets/disc-plus.png" alt="" class="img_cd">
        <img :src="musicList.al.picUrl" alt="" class="img_ar"
            :class="{ img_ar_active: !isbtnShow, img_ar_paused: isbtnShow }" @click="isLyricShow = true">
    </div>
    <div class="musicLyric" v-show="isLyricShow" @click="isLyricShow=false" >
        {{ lyricList.lyric }}
    </div>

    <div class="detailFooter">
        <div class="footerTop">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caidan1"></use>
            </svg><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caidan1"></use>
            </svg><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caidan1"></use>
            </svg><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caidan1"></use>
            </svg><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caidan1"></use>
            </svg>
        </div>

        <div class="footer">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caidan1"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
                <use xlink:href="#icon-caidan1"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-if="isbtnShow" @click="play">
                <use xlink:href="#icon-fanhuijian"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-else @click="play">
                <use xlink:href="#icon-caidan1"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goPlay(1)">
                <use xlink:href="#icon-caidan1"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caidan1"></use>
            </svg>
        </div>

    </div>
</template>

<script setup>
import { onMounted, computed, onUpdated, reactive, ref } from "vue";
import { useStore } from "vuex";
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'

const store = useStore()
const props = defineProps({
    musicList: Object,
    isbtnShow: Boolean,
    play: Function,
})

const isLyricShow=ref(false)  //歌词是否展示

// const backHome = () => {
//     isLyricShow=false
//     updateDetailShow()
// }
const goPlay = (num) => {
    const index = ref(playListIndex + num)
    if (index < 0) {
        index = playList.length - 1
    } else if (index == playList.length) {
        index = 0
    }
    updatePlayListIndex(index)
}

const playList = computed(() => store.state.playList)
const playListIndex = computed(() => store.state.playListIndex)
const lyricList = computed(() => store.state.lyricList)

const updatePlayListIndex = value => store.commit('updatePlayListIndex', value)
const updateDetailShow = () => {store.commit('updateDetailShow')}

const lyric = computed(() => {
    let arr
    if (store.state.lyricList.lyric) {
        // const arr =reactive([]) ;
        arr = store.state.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
            let min = item.slice(1, 3);
            let sec = item.slice(4, 6);
            let mill = item.slice(7, 10);
            let lrc = item.slice(11, item.length);
            if (isNaN(Number(mill))) {
                mill = item.slice(7, 9);
                lrc = item.slice(10, item.length)
            }
            // console.log(min,sec,Number(mill),lrc);//传入min,sec,Number(mill),lrc的值正常显示
        })
        console.log(arr);//这里传进arr数组的值为undefine，暂时没找到原因！！！！需要看一下动态响应数组是怎么传值的
    }

})

onMounted(() => {
    console.log(props.musicList);
    console.log(store.state.lyricList.lyric);
})



</script>

<style lang="scss" scoped>
.bgimg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(70px)
}

.detailTop {
    width: 100%;
    height: 1rem;
    display: flex;
    padding: .2rem;
    justify-content: space-between;
    align-items: center;
    fill: #fff;

    .detailTopLeft {
        display: flex;
        align-items: center;

        .leftMarquee {
            width: 3rem;
            height: 100%;
            margin-left: .4rem;

            .icon {
                width: .3rem;
                height: .3rem;
            }
        }
    }
}

.detailFooter {
    width: 100%;
    position: absolute;
    top: 10rem;

    // height: 2rem;
    // display: flex;
    // justify-content: space-around;
    // align-items: center;s
    .footerTop {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .footer {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
}

.detailContent {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .img_needle {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-13deg);
        transition: all 2s;
    }

    .img_needle_active {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(0deg);
        transition: all 2s;
    }

    .img_cd {
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 2.3rem;
        z-index: -1;
    }

    .img_ar {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 3.14rem;
        animation: rotate_ar 10s linear infinite;
    }

    .img_ar_active {
        animation-play-state: running;
    }

    .img_ar_paused {
        animation-play-state: paused;
    }

    @keyframes rotate_ar {
        0% {
            transform: rotateZ(0deg);
        }

        100% {
            transform: rotateZ(360deg);
        }
    }
}
</style>