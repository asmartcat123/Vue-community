<template>
<div>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-box">
    <div class="avator-box">
    <img src="../assets/logo.png">
    </div>
    <h1>{{ title }}</h1>
  <el-form-item label="用户名" prop="username">
    <el-input v-model="form.username" name="username" ></el-input>
  </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" name="password" type="password"></el-input>
    </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="onSubmit('form')">登录</el-button>
      <el-button type="primary" @click="Register()">注册</el-button>
    <el-button  @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>


</div>
</template>



<script>

export default {
  name: "Login",
  title:'欢迎登陆',
  data() {

    return {
      title:'欢迎登录',
      form: {
        username: '',
        password:''
      },
      rules:{
        username:[ { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password:[ { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },

    }
  },
  mounted() {

  },

  methods: {
    Register(){
      this.$router.push("/register");
    },
    onSubmit(formName) {
      //

      this.$refs[formName].validate( async valid => {
        if (valid) {
          const {data:res}= await this.$http.post("http://localhost:1642/api/User/checkuser",this.form);
          console.log(res);
          console.log(123);
          if(res.code!=200) return this.$message.error("登录失败");
          window.sessionStorage.setItem('isLogin',res.token);
          await this.$store.dispatch('asynacsetUser', {username: res.data[0].username,usercode:res.data[0].usercode});
          window.sessionStorage.setItem('usercode',this.$store.getters.getUser.usercode);
          window.sessionStorage.setItem('uid',res.data[0].uid);
          await this.$router.push("/main");
          this.$message.success("登录成功");
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
img{
  width: 100%;
  height:100%;
  border-radius:50% ;
  background-color: #fff;

}
.avator-box{
  position: relative;
  top: -60px;
  left: 50%;
  transform: translate(-50%,0%);
  width: 50px;
  height: 50px;
  box-shadow: 0 0 10px #ddd;
  border: 1px solid #eee;
  border-radius: 50%;
}
.login-box{
  position: absolute;
  width: 400px;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  padding: 40px;
  border: 1px solid #DCDEF6;

}

</style>
