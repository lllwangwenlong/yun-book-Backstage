<template>
    <div class="user-manage">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table
        class="table"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="nickname"
          label="姓名"
          width="130">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="个性签名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="用户头像"
          width="100">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" class="avatar">
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button @click="handleDetails(scope.row)" size="small" type="primary">
              查看详细
            </el-button>
            <el-button @click="handleDelete(scope.row._id)" size="small" type="danger">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="paging"
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total=this.count>
      </el-pagination>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          tableData: [],
          count: 0
        }
      },
      methods: {
        getData(pn) {
          this.$axios.get('/user',{pn}).then(res => {
            if(res.code == 200) {
              let newArr = res.data
              newArr.forEach(item => {
                let createdTime = new Date(item.createdTime).toLocaleString()
                let updatedTime =  new Date(item.updatedTime).toLocaleString()
                item.createdTime = createdTime
                item.updatedTime = updatedTime
            })
              this.count = res.count
              this.tableData = newArr
            }
          })
        },
        handleCurrentChange(val) {
          this.getData(val)
        },
        handleDetails(data) {
          this.$router.push({path:'/home/userDetail',query:{userInfo: data}})
        },
        handleDelete(id) {
                  this.$confirm('此操作将删除一位管理员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.$axios.post('/user/delete',{userIds: [id] }).then(res => {
                      this.$message.success(res.msg)
                      this.getData()
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
        this.getData()
      }
    }
</script>

<style scoped lang="scss">
.user-manage {
  width: 811px;

  .table {
    margin-top: 20px;
  }
  .avatar {
    width: 50px;
    height: 50px;
  }
  .btn {
    margin: 0 auto;
  }
  .paging {
    text-align: center;
  }
}
</style>
