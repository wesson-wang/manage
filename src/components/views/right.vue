<template>
<div class="right">
    <router-view></router-view>
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
.right
    flex 1
    background $font-color5
    background-size cover
    overflow-y auto
</style>