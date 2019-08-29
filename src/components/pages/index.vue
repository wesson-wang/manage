<template>
<div class="index">
   <v-header></v-header>
   <div class="main">
       <v-left></v-left>
       <v-right></v-right>
   </div>
</div>
</template>
<script>
import vHeader from "../views/header.vue"
import vLeft from "../views/left.vue"
import vRight from "../views/right.vue"

import API from "../../common/js/api"
export default {
data(){return{}},
methods:{},
components:{
    vHeader,vLeft,vRight
},
computed: {
},watch: {
},mounted(){
}
}
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/index.styl"
.index 
    width 100vw
    height 100vh
    overflow hidden
    display flex
    flex-direction column
.main
    flex 1
    width 100vw
    display flex           
</style>