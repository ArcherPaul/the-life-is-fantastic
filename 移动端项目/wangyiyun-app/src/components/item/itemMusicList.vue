<template>
    <div class="bg">
        <div class="topNav">
            <div class="navLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-caidan1"></use>
                </svg>
                <span class="playAll">播放全部
                    <span class="tips">(共{{ itemList.length }}首)</span>
                </span>
            </div>
            <div class="navRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-caidan1"></use>
                </svg>
                <span class="onPicture">
                    收藏({{ subscribedCount }})
                </span>
            </div>
        </div>

        <div class="itemList">
            <div class="item" v-for="(item, i) in itemList" :key="i">
                <div class="itemLeft" @click="playMusic(itemList,i)" >
                    <span class="leftSpan">{{ i+ 1 }}</span>
                    <div>
                        <p>{{ item.name }}</p>
                        <span class="ar" v-for="(item1, index) in item.ar" :key="index">{{ item1.name }}</span>
                    </div>
                </div>

                <div class="itemRight">
                    <svg class="icon" aria-hidden="true" v-if="item.mv != 0">
                        <use xlink:href="#icon-caidan1"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-caidan1"></use>
                    </svg>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { mapMutations, useStore } from 'vuex';


const store= useStore()
const props = defineProps({
    itemList: Array,
    subscribedCount: Number
})
console.log(props);
function playMusic(itemList,i){
    store.commit('updatePlayList',itemList)
    store.commit('updatePlayListIndex',i)
}
</script>

<style lang="scss" scoped>
.bg {
    border-top-left-radius: .4rem;
    border-top-right-radius: .4rem;
    background-color: white;
    padding: 0 .1rem;

    .topNav {
        display: flex;
        justify-content: space-between;
        padding: .1rem 0;

        .navLeft {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 1rem;

            .playAll {
                color: black;

                .tips {
                    font-size: .2rem;
                    color: gray;
                }
            }

        }

        .navRight {
            display: flex;
            justify-content: space-around;
            align-items: center;
            background-color: red;
            border-radius: 25px;
            width: 2.5rem;

        }
    }

    .itemList {
        .item {
            display: flex;
            justify-content: space-between;

            .itemLeft {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .leftSpan {
                    padding: .1rem;
                }
                .ar{
                    color: gray;
                    font-size: .2rem;
                }
            }
            .itemRight{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
}
</style>