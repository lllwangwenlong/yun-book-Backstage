<template>
  <div class="container">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/books' }">图书管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加图书</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form class="form" ref="formData" :model="formData" label-width="80px">
      <el-form-item label="链接" prop="url">
        <el-input v-model="formData.url"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="formData.author"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="img">
        <el-switch
          v-model="isUpload"
          active-text="手动上传"
          inactive-text="头图网址">
        </el-switch>
        <el-input v-model="formData.img" v-if="!isUpload"></el-input>
        <uploadCom v-model="formData.img" v-else></uploadCom>
      </el-form-item>
      <el-form-item label="分类" prop="typeId">
        <el-select  v-model="formData.typeId" >
          <el-option v-for="(item,index) in categoryData"
                     :key="index"
                     :label="item.title"
                     :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <template>
          <el-button type="primary" @click="handleAdd">确认添加</el-button>
          <el-button @click="handleReduce('formData')">取消</el-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import uploadCom from '@/components/upload-com'
    export default {
      components: {
        uploadCom,
      },
      data () {
        return {
          formData: {
            url: '',
            author: '',
            img: '',
            typeId: ''
          },
          isUpload: false,
          categoryData: []
        }
      },
      methods: {
        getCategory () {
          this.$axios.get('/category').then(res => {
            this.categoryData = res.data
          })
        },
        handleAdd () {
          this.$axios.post('/book',this.formData).then(res => {
            if(res.code == 200) {
              this.$message.success(res.msg)
              this.$router.push(`/home/booksDetail?typeId=${this.formData.typeId}`)
            }
          })
        },
        handleReduce (formData) {
          this.$refs[formData].resetFields();
          this.formData.typeId = ''
        }
      },
      created () {
        this.getCategory()
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
