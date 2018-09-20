<template>
<div class="container">
  <!--<h1>传统表单上传</h1>-->
  <!--<form action="https://upload-z1.qiniup.com" method="post" enctype="multipart/form-data">-->
    <!--<input type="file" name="file">-->
    <!--<br>-->
    <!--<input type="text" name="token" v-model="token">-->
    <!--<br>-->
    <!--<button>-->
      <!--提交-->
    <!--</button>-->
  <!--</form>-->
  <!--<h1>axios上传图片</h1>-->
  <!--<input type="file" @change="handleChange">-->
  <!--<br>-->
  <!--<img v-if="imgData" :src="imgData" class="img">-->
  <h1>封装方法上传</h1>
  <uploadCom :success="uploadImg" ></uploadCom>
  <checkBox v-model="checkBox"></checkBox>
</div>
</template>

<script>
    import uploadCom from '@/components/upload-com'
    import checkBox from '@/components/check-box'
    import axios from 'axios'
    export default {
      components:{
        uploadCom,
        checkBox
      },
      data () {
        return {
          token: '',
          imgData:'',
          checkBox: ''
        }
      },
      methods: {
        getToken () {
          axios.get('http://upload.yaojunrong.com/getToken').then(res => {
            this.token = res.data.data
          })
        },
        handleChange (e) {
          let file = e.target.files[0]
          let formData = new FormData()
          formData.append("file", file, file.name)
          formData.append("token", this.token)
          axios.post('https://upload-z1.qiniup.com', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            this.imgData = res.data.url
          })
        },
        uploadImg (url) {
          this.imgData = url
        }
      },
      created () {
        this.getToken()
      }
    }
</script>

<style scoped lang="scss">
.container {
  .img {
    width: 100px;
    height: 100px;
  }
}
</style>
