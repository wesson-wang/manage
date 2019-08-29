<template>
<div class="deviceList">
    <h1 class="text-left margin-bottom20 title">{{$route.name}}</h1>
    <el-button type="info" plain class="btn_create" @click="addDevice(0)"  v-if="isAdmin!=2">新建</el-button>
    <el-table :data="devices" style="width: 100%">
      <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          <p>{{scope.$index+1}}</p>
        </template>
      </el-table-column>
      <el-table-column label="ip" width="150">
        <template slot-scope="scope">
          <p>{{ scope.row.ip }}</p>
        </template>
        </el-table-column>
         <el-table-column label="机房" width="200">
        <template slot-scope="scope">
          <p>{{ scope.row.door }}</p>
        </template>
      </el-table-column>
       <el-table-column label="编号" width="100">
        <template slot-scope="scope">
          <p>{{ scope.row.num }}</p>
        </template>
        </el-table-column>
         <el-table-column label="宽带" width="100">
        <template slot-scope="scope">
          <p>{{ scope.row.width }}</p>
        </template>
        </el-table-column>
       <el-table-column label="使用" width="100">
        <template slot-scope="scope">
          <p>{{ scope.row.status }}</p>
        </template>
        </el-table-column>
      <el-table-column label="操作" width="180" >
        <template slot-scope="scope">
          <el-button size="mini" @click="addDevice(scope.row.id)" v-if="isAdmin!=2">查看</el-button>
          <el-button size="mini" @click="buy(scope.row.status,scope.$index)" :disabled="(scope.row.status)=='已出售'" v-if="isAdmin==2">购买</el-button>
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
    devices:[],
    isAdmin:"",
}},
methods:{
    //封装好调用
     init(){
      this.$http({
      url: API.findDevice,
      method: "get"
    }).then(d => {
      //  console.log(d);
    //未登录，code
    if(d.data.code==-1){
        this.$router.push("/login")
        return;
    }
    if(d.data.isok){
        //表示登录OK
         this.devices = d.data.data;
              
    }else{
         this.$message({
          message: d.data.info,
          type: 'error'
        })     
    }    
    })
    },
    buy(status,index){
      if(status=="空闲"){
       // console.log(this.devices[index].status)
        var sale=this.devices[index].status="已出售";
         
        for(var i=0;i<this.devices.length;i++){
              delete this.devices[i]._id
        }
         //console.log(this.devices)
      ajax(this,API.updateDevice,"get",this.devices[index],d=>{
        //  this.$router.push("/index/device")
        this.$message.success(d.data.info)
      })
      }    
    },
    addDevice(id){
       this.$router.push("/index/device/create?id="+id)
    },
    handleDelete(index, id) {
      // console.log(index, row);
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ajax(this,API.delDevice,"get",{id:id},d=>{
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
.deviceList{
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