<template>
  <div class="container">
    <h1 class="title">欢迎来到cloud-book后台管理系统</h1>
    <div class="login-box">
      <h2 class="login-box-title">请登录</h2>
      <el-form class="form">
        <el-form-item label="用户名" class="form-title">
          <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password" type="password" placeholder="请输入密码" @keyup.enter.native="handleLogin"></el-input>
        </el-form-item>
      </el-form>
      <el-button class="form-btn" type="primary" @click="handleLogin"  :loading="isLoading">
        登录
      </el-button>
    </div>
  </div>
</template>

<script>
    export default {
      name: "login",
      data () {
        return {
          formData: {
            username: '',
            password: ''
          },
          isLoading: false
        }
      },
      methods: {
        handleLogin () {
          this.isLoading = true
          this.$axios.post('/login',this.formData).then(res => {
            if(res.code == 200){
              this.$store.commit('CHANGE_USERINFO',res.data)
              this.$message.success('登录成功')
              setTimeout(() => {
                this.$router.push('/home/index')
              })
            } else {
              this.$message.error(res.msg)
            }
            this.isLoading = false
          }).catch(err => {
            this.isLoading = false
          })
        }
      }
    }
</script>

<style scoped lang="scss">
.container {
  overflow: hidden;
  height: 100vh;
  background-color: #545c64;

  .title {
    margin-top: 100px;
    text-align: center;
    font-weight: 400;
    color: #fff;
  }

  .login-box {
    width: 400px;
    height: 300px;
    border: 1px solid #f1f1f1;
    border-radius: 6px;
    margin: 20px auto 0;
    padding: 40px;
    background-color: #f1f1f1;

    .login-box-title {
      color: #333;
      text-align: center;
      font-weight: 400;
    }

    .form-title {
      margin-top: 20px;
    }

    .form-btn {
      width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
