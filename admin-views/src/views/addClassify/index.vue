<template>
    <div class="container">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>添加图书分类</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form class="form" ref="formData" :model="formData" label-width="80px">
        <el-form-item label="说明" prop="title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <uploadCom v-model="formData.icon"></uploadCom>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">确认添加</el-button>
          <el-button @click="handleReduce('formData')">取消</el-button>
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
              icon: '',
              title: ''
            }
          }
        },
      methods: {
        handleAdd () {
          this.$axios.post('/category',this.formData).then(res => {
            if(res.code == 200) {
              this.$message.success(res.msg)
              this.$router.push('/home/books')
            }
          })
        },
        handleReduce (formData) {
          this.$refs[formData].resetFields();
          this.formData.icon = ''
        }
      }
    }
</script>

<style scoped lang="scss">
  .container {
    width: 600px;

    .form {
      margin-top: 20px;
    }
  }
</style>
