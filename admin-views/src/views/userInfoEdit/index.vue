<template>
  <div class="users-add">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form v-model="formData" label-width="80px" label-position="left" style="margin-top: 20px">
      <el-form-item label="用户名">
        <el-input v-model="formData.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
         <el-input v-model="formData.nickname"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <uploadCom v-model="formData.avatar"></uploadCom>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="formData.desc"></el-input>
      </el-form-item>
      <el-button type="primary" @click="handleEdit">
        保存修改
      </el-button>
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
            nickname: '',
            email: '',
            avatar: '',
            desc: ''
          }
        }
      },
      methods: {
        initData () {
          this.formData = {
            ...this.$store.state.userInfo
          }
        },
        handleEdit () {
          this.$axios.put('/user/userInfo', this.formData).then(res => {
            console.log(res)
            if(res.code == 200) {
              console.log(res)
              this.$store.commit('CHANGE_USERINFO',res.data)
              this.initData()
              this.$message.success(res.msg)
            }
          })
        }
      },
      created () {
        this.initData()
      }
    }
</script>

<style scoped>
.users-add {
  width: 600px;
}
</style>
