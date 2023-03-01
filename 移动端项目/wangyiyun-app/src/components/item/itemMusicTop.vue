<template>
    <div class="itemMusicTop">
        <img :src="playlist.coverImgUrl" alt="" class="bgimg">
        <div class="itemLeft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-fanhuijian"></use>
            </svg>
            <span class="gedan">歌单</span>
        </div>
        <div class="itemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fangdajing"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caidan1"></use>
            </svg>
        </div>

    </div>


    <div class="details">
        <img :src="playlist.coverImgUrl" alt="" class="deimg">
        <div class="detailsR">
            <p>{{ playlist.name }}</p>
            <div class="deAuther">
                <img :src="playlist.creator.backgroundUrl" alt="" class="deimg2">
                <span>{{ playlist.creator.nickname }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fanhuijian"></use>
                </svg>
            </div>
            <div>
                <p>
                    <span>{{ playlist.description }}</span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fanhuijian"></use>
                    </svg>
                </p>
            </div>
        </div>
    </div>
    <div class="deNav">
        <div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shouye"></use>
            </svg>
            <span></span>
        </div>
        <div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
            <span></span>
        </div>
        <div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai"></use>
            </svg>
            <span></span>
        </div>
        <div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xuanze-duoxuan-tianchong"></use>
            </svg>
            <span></span>
        </div>
    </div>
    
</template>

<script setup>
import { onMounted } from "vue";

// const {playlist}=defineProps(['playlist'])
const props = defineProps({
    playlist: Object

    
})
console.log(props);


</script>

<style lang="scss" scoped>
.itemMusicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: .2rem;
    position: relative;

    .itemLeft,
    .itemRight {
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 .2rem;

        .gedan {
            font-size: .4rem;
            color: white;
        }

        .icon {
            fill: #fff; //填充颜色
        }
    }

    .bgimg {
        width: 100%;
        height: 8rem;
        position: fixed;
        z-index: -1;
        filter: blur(30px);
    }
}

.details {
    display: flex;
    justify-content: space-between;
    padding: 0 .2rem;
    .detailsR{
        padding: 0 .2rem;
    }

    .deimg{
        width: 2rem;
        height: 2.2rem;
        border-radius: .4rem;
    }
    p{
        font-size: .2rem;
    }
    .deAuther{
        display: flex;
        margin: .2rem .2rem;
        align-items: center;

        .deimg2{
            width: .4rem;
            height: .4rem;
            justify-content: flex-start;
            //align-items: center;
            border-radius: 50%;

        }
        span{
            display: flex;
            font-size: .2rem;
            justify-content: center;
            
        }
    }
}
.deNav{
    display: flex;
    justify-content: space-around;
    padding: .2rem 0 ;
}
</style>