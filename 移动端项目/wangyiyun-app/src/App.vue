<template>
  <router-view/>
  <div v-show="$store.state.isFooterMusic">
    <FootMusic/>
  </div>
</template>

<script setup>
import FootMusic from "@/components/item/FootMusic.vue";

</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon{
  width: .5rem;
  height: 0.5rem;
}
a{
  color: black;
}
</style>
