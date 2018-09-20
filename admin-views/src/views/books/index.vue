<template>
    <div class="container">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>图书分类管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table
        class="table"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="icon"
          label="封面"
          width="100">
          <template slot-scope="scope">
            <img :src="scope.row.icon" class="icon">
          </template>
        </el-table-column>
        <el-table-column
          prop="_id"
          label="ID"
          width="240">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="200">
        </el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="scope">
            <el-button @click="handleDetails(scope.row._id)" size="small" type="primary">
            查看详细
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
          tableData: []
        }
      },
      methods: {
        getBooks () {
          this.$axios.get('/category',{size: 100}).then(res => {
            this.tableData = res.data
          })
        },
        handleDetails (id) {
          this.$router.push({path:'/home/booksDetail',query: {typeId: id}})
        },
        handleEdit (id) {
          this.$router.push({path:'/home/booksEdit',query: {typeId: id}})
        },
        handleDelete (id) {
          this.$axios.delete(`/category/${id}`).then(res => {
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
  width: 791px;

  .table {
    margin-top: 20px;

    .icon {
      width: 80px;
      height: 100px;
    }
  }
}
</style>
