<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-fanhuijian"></use>
        </svg>
        <input type="text" @keydown.enter="enterKey" v-model="searchKey">
    </div>
    <div class="searchHistory">
        <span class="searchSpan">历史</span>
        <span v-for="item in keyWorldList" :key="item" class="spanKey">
            {{ item }}</span>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fanhuijian"></use>
        </svg>
    </div>
</template>

<script setup>
import { reactive, ref,onMounted,onUpdated } from "vue";

// onMounted(()=>{
//     keyWorldList=localStorage.getItem('keyWorldList')||'[]'
// })


let keyWorldList = reactive([])
let searchKey = ''
const enterKey = () => {
    if(searchKey!==''){
        keyWorldList.unshift(searchKey)
    keyWorldList=reactive([...new Set(keyWorldList)])//去重
        if(keyWorldList.length>5){
            keyWorldList.pop()
        }
    // localStorage.setItem('keyWorldList',keyWorldList)
    searchKey=''
    }
    
}

</script>

<style lang="scss" scoped>
.searchTop {
    width: 100%;
    height: 1rem;
    padding: 0 .2rem;
    display: flex;
    align-items: center;

    input {
        margin-left: .2rem;
        border: none;
        border-bottom: .02rem solid #999;
        width: 90%;
        padding: .1rem;
    }
}

.searchHistory {
    width: 100%;
    padding: .2rem;
    position: relative;

    .searchSpan {
        // font-size: .4rem;
        font-weight: 700;
    }

    .spanKey {
        padding: .1rem .2rem;
        background-color: #999;
        border-radius: .4rem;
        margin: .1rem .2rem;
        display: inline-block;
    }
    .icon{
        width: .3rem;
        height: .3rem;
        position: absolute;
        right: .2rem;
    }
}</style>