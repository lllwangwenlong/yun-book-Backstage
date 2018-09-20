<template>
  <div class="container">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/books' }">图书管理</el-breadcrumb-item>
        <el-breadcrumb-item>分类编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form class="form" ref="formData" :model="formData" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="index">
        <el-input v-model="formData.index"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="icon">
        <uploadCom v-model="formData.icon"></uploadCom>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click = keepEdit>保存更改</el-button>
        <el-button>取消</el-button>
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
              title: '',
              icon: '',
              index: '',
            },
            id: ''
          }
        },
        methods: {
          getBooksEdit () {
            let id = this.$route.query.typeId
            this.$axios.get(`/category/${id}`).then(res => {
              this.formData = res.data
            })
          },
          keepEdit () {
            this.$axios.put(`/category/${this.formData._id}`,this.formData).then(res => {
              if(res.code == 200) {
                this.$message.success(res.msg)
                this.$router.push('/home/books')
              }else {
                this.$message.error(res.msg)
              }
            })
          }
        },
      created () {
          this.getBooksEdit()
      }
    }
</script>

<style scoped>

</style>
