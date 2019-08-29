<template>
<div class="container">
    <router-view></router-view>
</div>
</template>
<script>
import API from "../../common/js/api"
import ajax from "../../common/js/ajax"

export default {
data(){return{
    notice:[]
}},
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
.container
    margin:40px
    width:80%   

</style>