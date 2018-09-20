<template>
    <div class="users-add">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户添加</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="formData" :model="formData" :rules="rules" label-width="80px" label-position="left" style="margin-top: 20px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpassword">
          <el-input type="password" v-model="formData.checkpassword" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formData.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="个人邮箱">
          <el-input v-model="formData.email" placeholder="请输入个人邮箱"></el-input>
        </el-form-item>
        <el-form-item label="个人签名">
          <el-input type="textarea" v-model="formData.desc" placeholder="请输入个人签名"></el-input>
        </el-form-item>
        <el-form-item label="上传头像">
          <el-upload
            class="avatar-uploader"
            v-model="formData.avatar"
            action="https://upload-z1.qiniup.com"
            :data=tokenData
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="formData.avatar" :src="formData.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUsers">立即添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
          var checkUsername = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('用户名不能为空'));
            }else {
              callback();
            }
          };
          var validatePassword = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (value.length<5) {
                callback(new Error('用户密码不得少于5位'))
              }
              callback();
            }
          };
          var validatePassword2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.formData.password) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
          return {
            formData:{
              username: '',
              password: '',
              desc: '',
              email: '',
              nickname: '',
              avatar: '',
              checkpassword: ''
            },
            rules: {
              username: [
                { validator: checkUsername, trigger: 'blur' }
              ],
              password: [
                { validator: validatePassword, trigger: 'blur' }
              ],
              checkpassword: [
                { validator: validatePassword2, trigger: 'blur' }
              ]
            },
            tokenData: {
              token: ''
            }
          }
        },
      methods: {
          getToken () {
            axios.get('http://upload.yaojunrong.com/getToken').then(res => {
              this.tokenData.token = res.data.data
            })
          },
          handleAvatarSuccess(res, file) {
            this.formData.avatar = res.url
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
        addUsers() {
          this.$axios.post('/user',this.formData).then(res => {
            if(res.code == 200) {
              this.$message.success(res.msg)
              this.$router.push('/home/users')
            }
          })
        }
      },
      created () {
          this.getToken()
      }
    }
</script>

<style scoped lang="scss">
.users-add {
  width: 600px;

  .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
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
  }
}
</style>
