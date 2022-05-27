<template>
<div>

  <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <el-button type="primary" @click="updatehead">上传头像</el-button>
</div>
</template>

<script>
export default {
  name: "Task",
  data() {
    return {
      imageUrl: '',
      himage:''
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.himage="json/himage/"+file.raw.name;
      console.log(this.himage);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    async updatehead(){
      let uid=window.sessionStorage.getItem('uid');
      console.log(uid);
      console.log(this.himage)
      const{data:res}=await this.$http.get("http://localhost:1642/api/User/uploadheader",{params:{uid:uid,himage:this.himage}});
      if(res.code==200)
        this.$message.success("上传成功");

    }
  }
}
</script>

<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}


</style>
