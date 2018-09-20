<template>
    <div class="container">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>修改个人信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form v-model="formData" label-width="80px" label-position="left" style="margin-top: 20px">
        <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
        <el-form-item label="ID">
          <el-input v-model="formData._id"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <uploadCom v-model="formData.avatar"></uploadCom>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formData.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="formData.desc"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="formData.createdTime"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="formData.updatedTime"></el-input>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    import uploadCom from '@/components/upload-com'
    export default {
      components: {
        uploadCom
      },
      data () {
        return {
          formData: {
            username: '',
            _id: '',
            avatar: '',
            nickname: '',
            email: '',
            desc: '',
            createdTime: '',
            updatedTime: '',
          }
        }
      },
      methods: {
        initData () {
          this.formData = this.$route.query.userInfo
        }
      },
      created () {
        this.initData()
      }
    }
</script>

<style scoped>
.container {
  width: 600px;
}
</style>
