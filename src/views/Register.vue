<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-box">
      <div class="avator-box">
        <img src="../assets/logo.png">
      </div>
      <h1>欢迎注册</h1>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" name="username" ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" name="password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" name="email" ></el-input>
      </el-form-item>
      <el-form-item  label="权限选择" prop="usercode">
        <el-select style="margin-left: -100px" v-model="form.usercode" placeholder="请选择用户类型" >
          <el-option label="普通用户" value="user"></el-option>
          <el-option label="管理员" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">注册</el-button>
        <el-button  @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-dialog class="windowbox" :visible.sync="dialogFormVisible">
      <el-form :model="form"  class="tanchuang">
        <el-form-item label="请输入验证码" :label-width="formLabelWidth">
          <el-input v-model="form.checkword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button  type="primary" :class="{disabled: !this.canClick}" @click="countDown">{{content}}</el-button>
        <el-button  type="primary" @click="register">确 定</el-button>


      </div>
    </el-dialog>


  </div>
</template>

<script>

export default {
  name: "Register",
  data() {
   let checkemail=(rules,value,callback)=>{
      var reg = /^[1-9][0-9]{4,10}@qq.com$/;
      if(reg.test(value)===false){
        return callback(new Error("请填写正确格式"));
      }else{
        callback();
      }

    };
    return {
      canClick:true,
      totalTime:60,
      content:'发送验证码',
      timer:'',
      form: {
        username: '',
        password:'',
        email:'',
        usercode:'',
        checkword:'',

      },
      rules:{
        username:[ { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password:[ { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        email:[{required:true,message:'请输入邮箱',trigger:'blur'},
          {validator:checkemail,trigger: 'blur'}],
        usercode: [
          { required: true, message: '请选择用户类型', trigger: 'change' }
        ],
      },
      dialogFormVisible: false,
      formLabelWidth: '100px'

    }
  },
  methods: {
   async register(){
     const{data:res}=await this.$http.post("http://localhost:1642/api/User/registeruser",this.form)
     console.log(res);
     if(res.code!=200) return this.$message.error("验证码已过期");
     await this.$router.push("/login");
     this.$message.success("注册成功");

    },
   async countDown(){
     if(this.canClick){
       this.canClick=false;
       this.content=this.totalTime+'s后重新发送';
       await this.$http.get("http://localhost:1642/api/User/checkps", {params:{email:this.form.email,username:this.form.username}});
       this.timer=setInterval(()=>{
         this.totalTime--;
         this.content=this.totalTime+"s后重新发送";
         if(this.totalTime<0){
           clearInterval(this.timer);
           this.content="重新发送验证码";
           this.totalTime=60;
           this.canClick=true;
         }
       },1000)
     }

    },


    onSubmit(formName) {
      this.$refs[formName].validate( async valid => {
        if (valid) {
          const{data:res}=await this.$http.get("http://localhost:1642/api/User/checkuser", {params:{username:this.form.username}});
          if(res.code==404){
            return this.$message.error("用户名已存在");
          }
         else {
            this.dialogFormVisible = true;
            if (!this.canClick) return
            this.canClick = false;
            this.content = this.totalTime + 's后重新发送';
            await this.$http.get("http://localhost:1642/api/User/checkps", {
              params: {
                email: this.form.email,
                username: this.form.username
              }
            });
            this.timer = setInterval(() => {
              this.totalTime--;
              this.content = this.totalTime + "s后重新发送";
              if (this.totalTime < 0) {
                clearInterval(this.timer);
                this.content = "重新发送验证码";
                this.totalTime = 60;
                this.canClick = true;

              }
            }, 1000)
          }
        }else {
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
  width: 400px;
  margin: 250px auto;
  padding: 40px;
  border: 1px solid #DCDEF6;

}

.tanchuang{
  width: 80%;
}
.windowbox{
  width: 50%;
  margin: 150px auto;
}
.disabled{
  background-color: #ddd;
  border-color: #ddd;
  color:#57a3f3;
  cursor: not-allowed;
}
</style>
