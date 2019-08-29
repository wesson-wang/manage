<template>
<div class="newsList">
 <h1 class="text-left margin-bottom20 title">{{$route.name}}</h1>
    <el-button type="info" plain class="btn_create" @click="addManage(0)" v-if="isAdmin!=2">新建</el-button>
    <el-table :data="news" style="width: 100%">
      <el-table-column label="序号" width="180">
        <template slot-scope="scope">
          <p>{{scope.$index+1}}</p>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="300">
        <template slot-scope="scope">
          <p>{{ scope.row.tit }}</p>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="180">
        <template slot-scope="scope">
          <p>{{ scope.row.time|transTime}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="addManage(scope.row.id)">查看</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)" v-if="isAdmin!=2">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
</div>
</template>
<script>
import API from "../../common/js/api"
import ajax from "../../common/js/ajax"
export default {
data(){return{
    news:[],
    isAdmin:""
}},
methods:{
   //封装好方便调用
    init(){
      this.$http({
      url: API.findNews,
      method: "get"
    }).then(d => {
       console.log(d);
    //未登录，code
    if(d.data.code==-1){
        this.$router.push("/login")
        return;
    }
    if(d.data.isok){
        //表示登录OK
         this.news = d.data.data;
    }else{
         this.$message({
          message: d.data.info,
          type: 'error'
        })     
    }    
    })
    },
    addManage(id){
       this.$router.push("/index/news/create?id="+id)
    },
    handleDelete(index, id) {
      // console.log(index, row);
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ajax(this,API.delNews,"get",{id:id},d=>{
          this.init()            
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
          });
    }   
},
components:{},
computed: {
},watch: {
},mounted(){
  this.init()
  this.isAdmin=localStorage.getItem("isAdmin")
}
}
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/index.styl"
.newsList{
    width 100%
}
.title {
  font-size: 30px;
}

.btn_create {
  display: block;
  font-size: 20px;
  padding: 10px 15px;
  margin-bottom: 20px;
}
</style>