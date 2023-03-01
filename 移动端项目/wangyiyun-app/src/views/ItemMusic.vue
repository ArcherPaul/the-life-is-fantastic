<template>
    <div>
        <itemMusicTop v-if="state.playlist.creator" :playlist="state.playlist" />
        <itemMusicList  :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount"/>

    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicItemList, getItemList } from "@/request/api/item";
import itemMusicTop from "@/components/item/itemMusicTop.vue";//子组件1
import itemMusicList from "@/components/item/itemMusicList.vue";//子组件2



const state = reactive({
    playlist: {},//歌单详情页数据
    itemList: [],//歌单歌曲
})

onMounted(async () => {
    let id = useRoute().query.id
    console.log(useRoute(id));
    // 获取歌单详情页
    let res = await getMusicItemList(id)
    console.log(res);

    // 获取歌单的歌曲
    let result = await getItemList(id)
    console.log(result);

    state.itemList=result.data.songs
    state.playlist = res.data.playlist
})



</script>

<style lang="scss" scoped>

</style>