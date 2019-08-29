<template>
  <div class="create">
    <h3 class="h2 margin-bottom20">{{$route.name}}</h3>
    <div>
      <el-form label-width="80px" :model="user" ref="user" :rules="rules">
        <el-form-item label="ip" class="select" prop="ip">
          <el-input v-model="user.ip"></el-input>
        </el-form-item>
        <el-form-item label="机房">
          <el-input v-model="user.door"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="user.num"></el-input>
        </el-form-item>
        <el-form-item label="宽带">
          <el-input v-model="user.width"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="user.status">
            <el-radio label="空闲" name="status"></el-radio>
            <el-radio label="已出售" name="status"></el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="text-center">
          <el-button type="primary" v-if="id==0" @click="add('user')">添加</el-button>
          <el-button type="primary" v-if="id!=0" @click="update('user')" :disabled="isAdmin==2">修改</el-button>
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
      user: {
        ip: "",
        door: "",
        num: "",
        width: "",
        status: ""
      },
      id: "",
      isAdmin: "",
      rules: {
        ip: [
          { required: true, message: "ip不能为空", triggler: "blur" },
          {
            pattern: /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g,
            message: "ip地址格式不正确"
          }
        ]
      }
    };
  },
  methods: {
    add(user) {
      this.$refs[user].validate(valid => {
        if (valid) {
          ajax(
            this,
            API.addDevice,
            "get",
            this.user,
            d => {
              this.$router.push("/index/device");
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
      delete this.user._id;
      this.$refs[user].validate(valid => {
        if (valid) {
          ajax(
            this,
            API.updateDevice,
            "get",
            this.user,
            d => {
              this.$router.push("/index/device");
              this.$message.success(d.data.info);
            },
            err => {
              this.$message.error(err.data.info);
            }
          )
        } else {
          console.log("error submit!!");
          return false;
        }
      })
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
        API.findDevice,
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
    this.isAdmin = localStorage.getItem("isAdmin");
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';
</style>