<template>
    <div class="container">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table
        class="table"
        :data="swraperData"
        border
        style="width: 100%">
        <el-table-column
          prop="img"
          label="轮播图"
          width="120">
          <template slot-scope="scope">
            <img :src="scope.row.img" style="width: 80px;height: 100px">
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
        <el-table-column
          prop="book.img"
          label="头书"
          width="120">
          <template slot-scope="scope">
            <img :src="scope.row.book.img" style="width: 80px;height: 100px">
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
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
        data() {
          return {
            swraperData: []
          }
        },
        methods: {
          getSwraper() {
            this.$axios.get('/swiper', {size: 100}).then(res => {
              this.swraperData = res.data
            })
          },
          handleEdit (id) {
            this.$router.push({path:'/home/editSwraper',query:{'swraperId': id}})
          },
          handleDelete (id) {
            this.$confirm('此操作将永久删除轮播图, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$axios.post('/swiper/delete',{ids: [id]}).then(res => {
                if(res.code == 200){
                  this.$message.success(res.msg)
                  this.getSwraper()
                }else {
                  this.$message.error(res.msg)
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }
        },
      created() {
          this.getSwraper()
      }
    }
</script>

<style scoped lang="scss">
.container {
  width: 841px;

  .table {
    margin-top: 20px;
  }
}
</style>
