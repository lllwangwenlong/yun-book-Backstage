<template>
    <div class="container">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>修改密码</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form class="form" ref="formData" :model="formData" :rules="rules" label-width="80px" label-position="left">
        <el-form-item label="原密码" prop="password">
          <el-input type="password" v-model="formData.password" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password1">
          <el-input type="password" v-model="formData.new_password1" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password2">
          <el-input type="password" v-model="formData.new_password2" placeholder="再次输入新密码"></el-input>
        </el-form-item>
        <el-form-item class="el-btn">
          <el-button type="primary" @click="handlePassword">保存修改</el-button>
          <el-button @click="cancel('formData')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
      data () {
        let checkPassword = (rule, value, callback) => {
          if(value === '') {
            callback(new Error('请输入密码'));
          }else {
            callback();
          }
        };
        let checkNewPassword1 = (rule, value, callback) => {
          if(value === '') {
            callback(new Error('请输入密码'));
          }else if(value == this.formData.password) {
            callback(new Error('新密码与原密码不能相同'));
          } else {
            callback();
          }
        };
        let checkNewPassword2 = (rule, value, callback) => {
          if(value === '') {
            callback(new Error('请再次输入密码'));
          }else if(value !== this.formData.new_password1) {
            callback(new Error('两次输入密码不一样'));
          }else {
            callback();
          }
        };
        return {
          formData: {
            password: '',
            new_password1: '',
            new_password2: '',
          },
          rules: {
            password: [
              { validator: checkPassword, trigger: 'blur'}
            ],
            new_password1: [
              { validator: checkNewPassword1, trigger: 'blur'}
            ],
            new_password2: [
              { validator: checkNewPassword2, trigger: 'blur'}
            ]
          }
        }
      },
      methods: {
        handlePassword () {
          this.$axios.put('/user/password',{password: this.formData.password,new_password: this.formData.new_password2,}).then(res => {
            if(res.code == 200) {
              this.$message.success(res.msg)
              this.$router.push('/login')
            }else {
              this.$message.success(res.msg)
            }
          })
        },
        cancel (formData) {
          this.$refs[formData].resetFields();
        }
      }
    }
</script>

<style scoped lang="scss">
.container {
  width: 600px;

  .form {
    margin-top: 20px;

    .el-btn {
      text-align: center;
    }
  }
}
</style>
