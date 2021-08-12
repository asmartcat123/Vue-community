<template>
<div>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-box">
    <img src="../assets/logo.png">
    <h1>欢迎登录</h1>
  <el-form-item label="用户名" prop="username">
    <el-input v-model="form.username" ></el-input>
  </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="onSubmit('form')">登录</el-button>
    <el-button  @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: "Login",
  data() {

    return {
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

  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate( (valid) => {
        if (valid) {
           const result=this.$http.post(' http://localhost:8080/json/test.json');
            this.$router.push("/main");
            console.log(result);




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
  width: 50px;
  position: absolute;
  transform: translate(-50%,-100%);

}
.login-box{
  width: 400px;
  margin: 300px auto;
  padding: 40px;
  border: 1px solid #DCDEF6;
}

</style>