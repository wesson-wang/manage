<template>
<div class="left text-center">
    <router-link to="/index/manage" active-class="select" v-if="isAdmin==0">管理员管理</router-link>
    <router-link to="/index/user" active-class="select" v-if="isAdmin!=2">用户管理</router-link>
    <router-link to="/index/news" active-class="select" >消息通知</router-link>
    <router-link to="/index/device" active-class="select">设备管理</router-link>
</div>
</template>
<script>
import API from "../../common/js/api"
export default {
data(){return{
    isAdmin:""
}},
methods:{},
components:{},
computed: {
},watch: {
},mounted(){
     this.isAdmin=localStorage.getItem("isAdmin")
}
}
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/index.styl"
.left
    width 200px
    min-width 200px
    height 100%
    background $font-color3
   
    padding-top 30px
a
    font-size 16px
    display block
    padding:5px
    margin-bottom 8px
    &:hover
        color $font-color5
        background rgba(0,0,0,0.5)
.select
    color $font-color5
    background rgba(0,0,0,0.7)    
</style>