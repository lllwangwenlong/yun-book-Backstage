<template>
    <div class="users-list">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table
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
          width="130">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="个人签名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="头像"
          width="100">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" class="avatar">
          </template>
        </el-table-column>
      </el-table>
    </div>

</template>

<script>
    export default {
      data () {
        return{
          tableData:[]
        }
      },
      methods: {
        getData() {
          this.$axios.get('/user').then(res => {
            if(res.code == 200) {
              this.tableData = res.data
            }
          })
        },
      },
      created() {
        this.getData()
      }
    }
</script>

<style scoped lang="scss">
  .users-list {
    .avatar {
      width: 50px;
      height: 50px;
    }
  }
</style>
