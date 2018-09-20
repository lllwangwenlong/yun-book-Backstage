<template>
    <div class="container">
      <div class="header">
        <h2 class="header-title">云书后台管理系统</h2>
        <el-dropdown class="userPhoto">
        <img :src="imgUrl">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handleDetail">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="handlePassword">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="handleLogin">退出登录</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="nav">
        <el-menu
          class="nav-router"
          :router="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/index">首页</el-menu-item>
              <el-menu-item index="/home/users">用户管理</el-menu-item>
              <el-menu-item index="/home/userslist">用户列表</el-menu-item>
              <el-menu-item index="/home/usersadd">用户添加</el-menu-item>
              <el-menu-item index="/home/userInfoEdit">修改个人信息</el-menu-item>
              <el-menu-item index="/home/upload">上传图片测试</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>图书管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/books">图书管理</el-menu-item>
              <el-menu-item index="/home/addBooks">添加图书</el-menu-item>
              <el-menu-item index="/home/addClassify">添加分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>轮播图管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/swraperList">轮播图列表</el-menu-item>
              <el-menu-item index="/home/addSwraper">添加轮播图</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          imgUrl: ''
        }
      },
      methods: {
        getImg() {
          this.imgUrl = this.$store.state.userInfo.avatar
        },
        exit(){
          this.$router.push('/login')
        },
        handleDetail () {
          this.$router.push('/home/userInfoEdit')
        },
        handlePassword () {
          this.$router.push('/home/passwordEdit')
        },
        handleLogin () {
          this.$router.push('/login')
        }
      },
      created() {
        this.getImg()
      }
    }

</script>

<style scoped lang="scss">
.container {
  .header {
    position: relative;
    .header-title {
      height: 80px;
      line-height: 80px;
      margin-left: 200px;
      text-align: center;
      font-size: 20px;
      color: #333;
      font-weight: 400;
    }
    .userPhoto {
      position: absolute;
      top: 15px;
      right: 20px;
      bottom: 15px;
      width: 50px;
      height: 50px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    padding-top: 80px;
    width: 200px;
    border-right: 1px solid #f1f1f1;
    overflow: hidden;
    background-color: #545c64;

    /deep/ {
      .nav-router {
        border-right: none;
      }
    }
  }
  .main-content {
    margin-left: 200px;
    padding: 15px;
  }
}
</style>
