<template>
<div>
   
    <div class="welcome_img">
    <img src="../../assets/images/welcome4.gif" alt="">
    </div>
</div>
</template>
<script>
import API from "../../common/js/api"
export default {
data(){return{}},
methods:{},
components:{},
computed: {
},watch: {
},mounted(){
}
}
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/index.styl"
.welcome_img
    width 350px
    height 350px
    margin 100px auto
    overflow hidden
 img
    margin-top -1px
    margin-left -1px
    width 101%
    height 101%
    display block
    

</style>