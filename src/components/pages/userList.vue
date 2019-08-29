<template>
  <div class="userList">
    <h1 class="text-left margin-bottom20 title">{{$route.name}}</h1>
     <el-button type="info" plain class="btn_create" @click="addUser(0)">新建</el-button>
      <div>
      <el-table :data="info" style="width: 100%">
      <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          <p>{{scope.$index+1}}</p>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="150">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
       <el-table-column label="电话" width="150">
        <template slot-scope="scope">
          <p>{{ scope.row.tel }}</p>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="150">
        <template slot-scope="scope">
          <p>{{ scope.row.email }}</p>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="100">
        <template slot-scope="scope">
          <p>{{ scope.row.sex }}</p>
        </template>
      </el-table-column>
      <el-table-column label="身份证号" width="180">
        <template slot-scope="scope">
          <p>{{ scope.row.idx }}</p>
        </template>
      </el-table-column>
          <el-table-column label="备注" width="150">
        <template slot-scope="scope">
          <p>{{ scope.row.des}}</p>
        </template>
      </el-table-column>
      <el-table-column label="生日" width="150">
        <template slot-scope="scope">
          <p>{{ scope.row.time|transTime}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="addUser(scope.row.id)">查看</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div> 
  </div>
</template>
<script>
import API from "../../common/js/api";
import ajax from '../../common/js/ajax';

export default {
  data() {
    return {     
      info:[]
    };
  },
  methods: {
    init(){
      this.$http({
      url: API.findUser,
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
         this.info = d.data.data;
    }else{
         this.$message({
          message: d.data.info,
          type: 'error'
        })     
    }    
    })
    },
    addUser(id){
       this.$router.push("/index/user/create?id="+id)
    },
    handleDelete(index, id) {
      // console.log(index, row);
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ajax(this,API.delUser,"get",{id:id},d=>{
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
  components: {},
  computed: {
  },
  watch: {},
  mounted() {
      this.init()
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';
.userList
    width 90% 
    .title
      font-size: 30px;
    .btn_create {
      display: block;
      font-size: 20px;
      padding: 10px 15px;
      margin-bottom: 20px;
}
</style>