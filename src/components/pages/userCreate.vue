<template>
  <div class="create">
    <h3 class="h2 margin-bottom20">{{$route.name}}</h3>
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
        <el-form-item label="电话" prop="tel">
          <el-input v-model="user.tel" class="select"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email" class="select"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="user.sex">
            <el-radio label="男" name="sex"></el-radio>
            <el-radio label="女" name="sex"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号" prop="idx">
          <el-input v-model="user.idx" class="select" :disabled="id!=0"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="des">
          <el-input v-model="user.des" class="select"></el-input>
        </el-form-item>
        <el-form-item label="生日">
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
import reg from "../../common/js/reg"
export default {
  data() {
  

    return {
      user: {
        name: "",
        pass: "",
        tel: "",
        email: "",
        sex: "",
        idx: "",
        des: "",
        time: "",
        confirm: ""
      },

      id: "",
      rules:reg(this)
    
    };
  },
  methods: {
    register(user) {
      this.$refs[user].validate(valid => {
        if (valid) {
          //如果没有报错就执行提交
          delete this.user.confirm;
          ajax(
            this,
            API.addUser,
            "get",
            this.user,
            d => {
              this.$router.push("/index/user");
              this.$message.success(d.data.info);
            },
            err => {
              this.$message.error(error.data.info);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    update(user) {
      this.$refs[user].validate(valid => {
        if (valid) {
          //如果验证OK了就执行以下步骤
          delete this.user._id;
          delete this.user.confirm;
          ajax(
            this,
            API.updateUser,
            "get",
            this.user,
            d => {
              this.$router.push("/index/user");
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
        API.findUser,
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
</style>