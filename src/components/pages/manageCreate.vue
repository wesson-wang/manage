<template>
  <div class="create">
    <h3 class="h3 margin-bottom20">{{$route.name}}</h3>
    <div>
      <el-form label-width="80px" :model="user" ref="user" :rules="rules">
        <el-form-item label="账号" class="select" :required="id==0" prop="name">
          <el-input v-model="user.name" :disabled="id!=0"></el-input>
        </el-form-item>
        <el-form-item label="密码" :required="id==0" prop="pass">
          <el-input type="password" v-model="user.pass" class="select" :disabled="id!=0"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" v-if="id==0" prop="confirm">
          <el-input type="password" v-model="user.confirm" class="select"></el-input>
        </el-form-item>
        <el-form-item label="属性" prop="prop">
          <el-input v-model="user.prop" class="select"></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-date-picker v-model="user.time" type="date" placeholder="选择日期" class="select"></el-date-picker>
        </el-form-item>
        <div class="text-center">
          <el-button type="primary" v-if="id==0" @click="register('user')">注册</el-button>
          <el-button type="primary" v-if="id!=0" @click="update('user')">修改</el-button>
          <el-button type="info" @click="back()">返回</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/api";
import ajax from "../../common/js/ajax";
import reg from "../../common/js/reg";

export default {
  data() {
    return {
      user: {
        name: "",
        pass: "",
        prop: "",
        time: "",
        confirm: ""
      },
      id: "",
      rules: reg(this)
    };
  },
  methods: {
    register(user) {    
      this.$refs[user].validate(valid => {   
        if (valid) {
           delete this.user.confirm;
          ajax(
            this,
            API.addManage,
            "get",
            this.user,
            d => {
              this.$router.push("/index/manage");
              this.$message.success(d.data.info);
            },
            err => {
              this.$message.error(d.data.info);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    update(user) {
      console.log(this.user)
      this.$refs[user].validate(valid => {
        if (valid) {
          delete this.user._id;
          delete this.user.confirm;
          ajax(
            this,
            API.updateManage,
            "get",
            this.user,
            d => {
              this.$router.push("/index/manage");
              this.$message.success(d.data.info);
            },
            err => {
              this.$message.error(err.data.info);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    back() {
      this.$router.go(-1);
    }
  },
  components: {},
  computed: {},
  watch: {},
  mounted() {
    this.id = this.$route.query.id;
    if (this.id != 0) {
      ajax(
        this,
        API.findManage,
        "get",
        { id: this.id },
        d => {
          this.user = d.data.data[0];
        },
        err => {
          this.$message.error(d.data.info);
        }
      );
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.select {
  width: 100%;
  // min-width 600px
}
</style>