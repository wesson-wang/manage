<template>
  <div class="create">
    <h3 class="h2 margin-bottom20">{{$route.name}}</h3>
    <div>
      <el-form label-width="80px" :model="user">
        <el-form-item label="标题" class="select" >
          <el-input v-model="user.tit" ></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="user.con"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker v-model="user.time" type="date" placeholder="选择日期" class="select"></el-date-picker>
        </el-form-item>
        <div class="text-center">
          <el-button type="primary" v-if="id==0" @click="add()">添加</el-button>
          <el-button type="primary" v-if="id!=0" @click="update()" :disabled="isAdmin==2">修改</el-button>
          <el-button type="info" @click="back()">返回</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/api";
import ajax from "../../common/js/ajax";

export default {
  data() {
    return {
        user:{
            tit:"",
            con:"",
            time:""
        },
        id:"",
        isAdmin:""
    };
  },
  methods: {
      add(){ 
          ajax(this,API.addNews,"get",this.user,d=>{
              this.$router.push("/index/news")
              this.$message.success(d.data.info)
          },err=>{
              this.$message.error(d.data.info)
          })      
      },update(){
          delete this.user._id
          ajax(this,API.updateNews,"get",this.user,d=>{
              this.$router.push("/index/manage")
              this.$message.success(d.data.info)
          },err=>{
               this.$message.error(err.data.info)
        })
      },back(){
          this.$router.go(-1)
      }
  },
  components: {},
  computed: {},
  watch: {},
  mounted() {
       this.id=this.$route.query.id
       this.isAdmin=localStorage.getItem("isAdmin")
      if(this.id!=0){   
        ajax(this,API.findNews,"get",{id:this.id},d=>{
               this.user=d.data.data[0]
        },err=>{
               this.$message.error(d.data.info)
        })
      }
   
  }
  
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';
</style>