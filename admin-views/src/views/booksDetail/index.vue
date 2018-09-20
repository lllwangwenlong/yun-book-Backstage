<template>
    <div class="container">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/books' }">图书分类</el-breadcrumb-item>
          <el-breadcrumb-item>分类内容</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table
        class="table"
        :data="books"
        border
        style="width: 100%">
        <el-table-column
          prop="img"
          label="封面"
          width="100">
          <template slot-scope="scope">
            <img  :src="scope.row.img" alt=""style="width: 80px;height: 100px;">
          </template>
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          width="80">
        </el-table-column>
        <el-table-column
          prop="title"
          label="书名"
          width="130">
        </el-table-column>
        <el-table-column
          class="desc"
          prop="desc"
          label="简介"
          width="360">
        </el-table-column>
        /*show-overflow-tooltip*/
        <el-table-column label="操作" width="250px">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row._id)" size="small" type="primary">
              查看详情
            </el-button>
            <el-button @click="handleEdit(scope.row._id)" size="small" type="primary">
              编辑
            </el-button>
            <el-button @click="handleDelete(scope.row._id)" size="small" type="danger">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        data () {
          return {
            books: [],
            typeId: '',
            title: ''
          }
        },
        methods: {
          getBooks () {
            this.typeId = this.$route.query.typeId
            this.$axios.get(`/category/${this.typeId}/books`,{size: 100}).then(res => {
              this.title = res.data.title
              this.books = res.data.books
            })
          },
          handleDetail (id) {
            this.$router.push({path: '/home/bookDetail', query:{'bookId':id}})
          },
          handleEdit (id) {
            this.$router.push({path: '/home/bookDetail', query:{'bookId':id}})
          },
          handleDelete (id) {
            this.$axios.delete(`/category/${this.typeId}/book/${id}`).then(res => {
              if(res.code == 200) {
                this.$message.success(res.msg)
                this.getBooks()
              }
            })
          }
        },
      created () {
          this.getBooks()
      }
    }
</script>

<style scoped lang="scss">
.container {
  width: 921px;
  .table {
    margin-top: 20px;

    /*/deep/ {*/
      /*.desc {*/
        /*overflow: hidden;*/
        /*-webkit-line-clamp: 2;*/
        /*text-overflow: ellipsis;*/
        /*display: -webkit-box;*/
        /*-webkit-box-orient: vertical;*/
      /*}*/
    /*}*/
  }
}
</style>
