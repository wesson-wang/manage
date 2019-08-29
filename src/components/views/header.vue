<template>
<div class="header">
    <h2 class="h1 logo_name">后台管理系统</h2>
    <div class="user_info">
        <div class="photo"><img src="../../assets/images/photo.gif" alt=""></div>
        <div class="user_name text-center">
            <h2 class="h2">{{account}}</h2> 
            <div class="quit" @click="quit()"><el-button class="info">退出登录</el-button></div>
        </div>
        
    </div>
</div>
</template>
<script>
import API from "../../common/js/api"
export default {
data(){return{
    account:""
}},
methods:{
    quit(){
        localStorage.removeItem("user")
        this.$router.replace("/login")
        this.$message.info("退出登录")
    }
},
components:{},
computed: {
},watch: {
},mounted(){
    console.log(localStorage.getItem("user"))
    this.account=localStorage.getItem("user")
}
}
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/index.styl"
.header
    width 100vw
    height 80px
    background $font-color3
    border-bottom 1px solid $second-color
    .logo_name
        float left 
        width 500px
        color $font-color5
        line-height 80px
        padding-left 50px
    .user_info
        float right
        width 180px
        height 80px
        .photo
            float left
            margin-top 15px
            width 50px
            height 50px
            border-radius:50%
            overflow hidden       
            img 
                width 100%
                height 100%
        .user_name
            float left
            width 100px
            height 80px
            line-height 80px
            margin-left 30px
            position relative
            .quit
                position absolute
                left 0
                bottom -80px
                width 100%
                height 80px
                line-height 80px
                font-size 16px
                background $font-color5
                display none
            &:hover
                transition all 0.5s
                background $font-color5
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
                cursor pointer   
            &:hover .quit
                display block
                background $font-color5
                        
</style>