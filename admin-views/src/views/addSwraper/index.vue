<template>
    <div class="container">
      <el-form :model="formData" label-width="100px" style="width: 600px;">
        <el-form-item label="轮播图标题">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="轮播图书籍">
          <el-select v-model="formData.category" @change="categoryChange">
            <el-option v-for="(item,index) in categoryData"
                       :key="index"
                       :label="item.title"
                       :value="item._id"
            ></el-option>
          </el-select>

          <div class="book-item" v-if="getBookItem[0]">
            <div class="img-wrap">
              <img :src="getBookItem[0].img">
            </div>
            <div class="book-desc">
              <div class="title">
                书名:{{getBookItem[0].title}}
              </div>
              <div class="author">
                作者:{{getBookItem[0].author}}
              </div>
            </div>
          </div>

        </el-form-item>
        <el-form-item label="轮播图头图">
          <uploadCom v-model="formData.img"></uploadCom>
        </el-form-item>
        <el-form-item label="轮播图排序">
          <el-input-number v-model="formData.index" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item>
          <template slot-scope="scope">
            <el-button type="primary" @click="handleAdd" v-if="$route.name == 'addSwraper'">
              添加
            </el-button>
            <el-button type="primary" @click="handleEdit" v-else>
              保存更改
            </el-button>
          </template>
        </el-form-item>
      </el-form>

      <el-dialog title="书籍列表" :visible.sync="isShowDialog">
        <el-table :data="bookData">
          <el-table-column property="title" label="书名" width="150"></el-table-column>
          <el-table-column label="书籍头图" width="120">
            <template slot-scope="scope">
              <img :src="scope.row.img" style="width: 80px;height: 100px;">
            </template>
          </el-table-column>
          <el-table-column property="author" label="作者"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleAddBook(scope.row._id)">
                添加
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
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
            title: '',
            img: '',
            book: '',
            index: '',
            category: '',
          },
          categoryData: [],
          bookData: [],
          bookCount: 0,
          isShowDialog: false
        }
      },
      methods : {
        getCategory () {
          this.$axios.get('/category').then(res => {
            this.categoryData = res.data
          })
        },
        getinitData() { //编辑页面下使用
          let id = this.$route.query.swraperId
          this.$axios.get(`/swiper/${id}`).then(res => {
            this.formData = {
              ...this.formData,
              ...res.data,
              book: res.data.book._id, //回填书籍id
              category: res.data.book.type //回填分类id
            }
            this.getBookData()
          })
        },
        async getBookData () {
          const res = await this.$axios.get(`/category/${this.formData.category}/books`)
          this.bookData = res.data.books
          this.bookCount = res.count
        },
        categoryChange () {
          this.isShowDialog = true
          this.getBookData()
        },
        handleAddBook (id) {
          this.isShowDialog = false
          this.formData.book = id
        },
        handleAdd () {
          let isCanAdd = true
          for(let key in this.formData){
            if(!this.formData[key]) {
              isCanAdd = false
            }
          }
          if(isCanAdd) {
            this.$axios.post('/swiper',this.formData).then(res => {
              if(res.code == 200) {
                this.$message.success(res.msg)
                this.$router.push('/home/swraperList')
              }else {
                this.$message.error(res.msg)
              }
            })
          }
        },
        handleEdit () {
          this.$axios.put(`/swiper/${this.$route.query.swraperId}`,this.formData).then(res => {
            if(res.code == 200){
              this.$message.success(res.msg)
              this.$router.push('/home/swraperList')
            }
          })
        }
      },
      created () {
        this.getCategory()
        if(this.$route.name == 'addSwraper') { //添加轮播图页面
          this.formData =  {
            title: '',
            img: '',
            book: '',
            index: '',
            category: '',
          }
        }else { //编辑轮播图页面
          this.getinitData()
        }
      },
      computed: {
        getBookItem(){
          if(this.formData.book) {//如果有值则用户已经选择了一本书
            return this.bookData.filter(item => item._id == this.formData.book)
          }else {
            return []
          }
        }
      }
    }
</script>

<style scoped lang="scss">
.container {
  .book-item {
    width: 460px;
    height: 100px;
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #e8e8e8;

    .img-wrap {
      float: left;

      img {
        width: 80px;
        height: 100px;
      }
    }

    .book-desc {
      float: left;
      margin-left: 20px;

      .title {
        font-size: 16px;
        color: #333;
        font-weight: 700;
      }
    }
  }
}
</style>
