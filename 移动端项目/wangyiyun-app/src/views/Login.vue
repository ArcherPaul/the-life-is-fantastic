<template>
    <div class="login">
        <div class="loginTop">欢迎登录</div>
        <div class="loginContent">
            <input type="text" name="phone" class="phone" placeholder="请输入手机号码" v-model="data.phone">
            <input type="text" name="password" class="password" placeholder="请输入密码" v-model="data.password">
            <button class="btn" @click="login">登录</button>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";

const store=useStore()
const data=reactive({
    phone:'',
    password:'',
})

const login=()=>{
    store.dispatch('getLogin',{phone:data.phone,password:data.password})
}
</script>

<style lang="scss" scoped>
.login{
    width: 100%;
    height: 13.34rem;
    padding: .2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(248, 97, 97);
    .loginTop{
        margin-top: 1rem;
        font-size: 1rem;
        color: #fff;
    }
    .loginContent{
        width: 100%;
        height: 6rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        margin-top: 2rem;
        .phone,.password{
            width: 5rem;
            height: 1rem;
            border: .02rem solid #999;
        }
        .btn{
            width: 2rem;
            height: .6rem;
        }
    }
}
</style>