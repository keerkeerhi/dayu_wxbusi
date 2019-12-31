<template>
    <section class="registPage" >
      <van-cell-group class="item-div" >
        <van-field v-model="data.ShopName" placeholder="请输入店铺名称" />
      </van-cell-group>
      <van-cell-group class="item-div" >
        <van-field v-model="data.ShopLocation" @click-right-icon="getLoc" placeholder="请输入店铺位置" >
          <i class="iconfont iconlocation" slot="right-icon" ></i>
        </van-field>
      </van-cell-group>
      <van-cell-group class="item-div" >
        <van-field
          readonly
          clickable
          :value="data.ShopIndustry"
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
        <button class="normal-btn" @click="saveInfo" >提交审核</button>
      </div>
    </section>
</template>

<script>
  import marketService from '../../service/bolosev'
    export default {
        name: "Register",
      data(){
          return {
            showPicker: false,
            columns: ['百货', '美食', '服饰', '汽车'],
            data: {
              ShopName: '',
              ShopLocation: '',
              ShopCoordinates: '',
              ShopIndustry: '',
              BusinessLicense: '',
              Positive: '',
              Negative: ''
            },
            fileList: [

            ]
          }
      },
      created(){
        document.title = "入驻申请"
      },
      methods: {
        afterRead(file){
          // 此时可以自行将文件上传至服务器
          console.log(file);
        },
        getLoc(){
          this.$wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              this.$wx.openLocation({
                latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
                longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
                name: '', // 位置名
                address: '', // 地址详情说明
                scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
              });
            }
          });
        },
        onConfirm(value) {
          this.data.type = value;
          this.showPicker = false;
        },
        saveInfo(){
          marketService.shop_msg(this.data).then(res=>{
            if (res.code==0)
            {
              this.$route.push('/shopstatus');
            }
            else
            {
              this.$toast.fail('服务器宕机了，555~');
            }
          })
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
