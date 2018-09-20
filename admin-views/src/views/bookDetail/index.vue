<template>
    <div class="container">
      <el-form class="form" :model="formData" label-width="80px" label-position="left">
        <el-form-item label="封面">
          <uploadCom v-model="formData.img"></uploadCom>
        </el-form-item>
        <el-form-item label="书名">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="ID">
          <el-input v-model="formData._id"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formData.author"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-input v-model="this.type"></el-input>
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model="formData.index"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" autosize v-model="formData.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="keepEdit">保存修改</el-button>
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
      data() {
        return {
          formData: {
            img: '',
            title: '',
            book_id: '',
            author: '',
            type: '',
            index: '',
            desc: ''
          },
          type:''
        }
      },
      methods: {
        getBookDetail() {
          let id = this.$route.query.bookId
          this.$axios.get(`/book/${id}`).then(res => {
            this.formData = res.data
            this.formData.book_id = res.data._id
            this.$axios.get(`/category/${this.formData.type}`).then(res => {
              this.type = res.data.title
            })
          })
        },
        keepEdit () {
          this.$axios.put('/book', this.formData).then(res => {
            if(res.code == 200) {
              this.$message.success(res.msg)
              this.$router.go(-1)
            }else {
              this.$message.error(res.msg)
            }
          })
        }
      },
      created () {
        this.getBookDetail()
      }
    }
</script>

<style scoped lang="scss">
.container {
  .form {
    width: 600px;
    margin-top: 20px;
  }
}
</style>
