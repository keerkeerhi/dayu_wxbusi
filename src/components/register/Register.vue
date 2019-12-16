<template>
    <section class="registPage" >
      <van-cell-group class="item-div" >
        <van-field v-model="data.name" placeholder="请输入店铺名称" />
      </van-cell-group>
      <van-cell-group class="item-div" >
        <van-field v-model="data.location" @click-right-icon="getLoc" placeholder="请输入店铺位置" >
          <i class="iconfont iconlocation" slot="right-icon" ></i>
        </van-field>
      </van-cell-group>
      <van-cell-group class="item-div" >
        <van-field
          readonly
          clickable
          :value="data.type"
          placeholder="选择行业"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
      </van-cell-group>
      <van-cell-group class="item-div phoneDiv1" >
        <span>营业执照</span>
        <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" />
      </van-cell-group>
      <van-cell-group class="item-div phoneDiv1" >
        <span>身份证正反面</span>
        <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" />
        <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" />
      </van-cell-group>
      <div class="bottom-btn" >
        <button class="normal-btn" @click="toHome" >提交审核</button>
      </div>
    </section>
</template>

<script>
    export default {
        name: "Register",
      data(){
          return {
            showPicker: false,
            columns: ['百货', '美食', '服饰', '汽车'],
            data: {
              name: '',
              location: '',
              type: ''
            },
            fileList: [
              // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
              // // Uploader 根据文件后缀来判断是否为图片文件
              // // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
              // { url: 'https://cloud-image', isImage: true },
              // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
              // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
              // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
            ]
          }
      },
      created(){
        document.title = "入驻申请"
      },
      methods: {
        toHome(){
          this.$router.push("/home")
        },
        afterRead(file){
          // 此时可以自行将文件上传至服务器
          console.log(file);
        },
        getLoc(){
          Toast('获取位置');
        },
        onConfirm(value) {
          this.data.type = value;
          this.showPicker = false;
        }
      }
    }
</script>

<style scoped>
  .registPage{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #F8F8F8;
  }
  .item-div{
    margin-top: 40px;
  }
  .phoneDiv1{
    min-height: 236px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .phoneDiv1>span:first-child{
    font-size: 28px;
    color: rgb(150,151,153);
    margin-right: 20px;
    margin-left: 26px;
  }
  .iconlocation{
    color: #150080;
    font-weight: bold;
    font-size: 45px;
  }
  .normal-btn{
    border-radius: 10px;
    height: 84px;
    width: 325px;
  }
  .bottom-btn{
    margin-top: 5.333vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>
