<template>
  <div class="login">
    <div class="box">
      <h3 class="h2 text-center">登录</h3>
      <div class="text-center margin-top20">
        <el-select v-model="user.type" placeholder="请选择"  class="select">
          <el-option
            v-for="item in types"
            :key="item.type"
            :label="item.value"
            :value="item.type"
          ></el-option>
        </el-select>
      </div>
      <div class="text-center margin-top20">
          <el-input v-model="user.name" placeholder="请输入账号" class="select"></el-input>
      </div>
      <div class="text-center margin-top20">
         <el-input placeholder="请输入密码" v-model="user.pass" show-password class="select"></el-input>
      </div>
      <div class="text-center margin-top20" >
        <el-button type="info" plain round @click="login()">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/api";
export default {
  data() {
    return {
      types: [
        {
          type: 0,
          value: "超级管理员"
        },
        {
          type: 1,
          value: "普通管理员"
        },
        {
          type: 2,
          value: "用户"
        }
      ],
      user: {
        type: "",
        name: "",
        pass: ""
      }
    };
  },
  methods: {
    login() {
        // console.log(this.user);
      this.$http({
        url: API.login,
        method: "post",
        data: this.$qs.stringify(this.user)
      }).then(d => {
        //  console.log(d);
        if (d.data.isok) {
          localStorage.setItem("user",this.user.name)
          localStorage.setItem("isAdmin",d.data.isAdmin)
          this.$router.replace("/index");
          this.$message({
          message: d.data.info,
          type: 'success'
        })
        } else {
           this.$message({
          message: d.data.info,
          type: 'error'
        })
        }
      })
    }
  },
  components: {},
  computed: {},
  watch: {},
  mounted() {}
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.login {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: url(../../assets/images/login_bg.jpg);
  background-size: 100% 100%;

  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 300px;
    background: rgba(255,255,255,0.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    h3 {
      line-height: 40px;
      letter-spacing: 30px;
      border-bottom: 1px solid $font-color2;
    }
    .select{
        width 80%
    }
  }
}

</style>