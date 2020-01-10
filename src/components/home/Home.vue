<template>
  <section class="homePage" >
    <header class="homeHead" >
      <div class="shop_tit" >
        <div class="homeTitle" >
          {{shopInfo.ShopName}}aaa
        </div>
        <div class="titlelit" >好评率 100% </div>
      </div>
      <van-icon @click="showEdit" name="more-o" size="25" />
    </header>
    <div class="expireTime" >
      <span>Vip到期时间：2022年11月5日</span>
      <span>续费</span>
    </div>
    <section class="entryDiv global_shadow" >
      <div class="todayDiv" >今日入账：</div>
      <div class="todayMoney" >66666.66元</div>
    </section>
    <!--一周营业图-->
    <section class="dialogDiv global_shadow" >

    </section>
    <div class="positionDiv" >
      <span>店铺位置：</span>
      <span class="add_info" >
        {{shopInfo.ShopLocation}}
        <span class="fixedPosition" @click="getLoc" >重新定位</span>
      </span>
    </div>
    <van-tabbar route >
      <van-tabbar-item replace to="/home" icon="home-o" >我的店铺</van-tabbar-item>
      <van-tabbar-item replace to="/customer" icon="friends-o">我的顾客</van-tabbar-item>
      <van-tabbar-item replace to="/order" icon="balance-list-o">我的订单</van-tabbar-item>
      <van-tabbar-item replace to="/product" icon="setting-o">我的商品</van-tabbar-item>
    </van-tabbar>

    <van-popup
      v-model="showEd" closeable
      :style="{ width:'100%' }"
    >
      <section class="edit-shop" >
        <header>
          <label>美化商铺</label>
        </header>
        <van-cell-group title="重新获取位置" class="item-div" >
          <van-field v-model="shopInfo.ShopLocation" @click-right-icon="getLoc" placeholder="请输入店铺位置" >
            <i class="iconfont iconlocation" slot="right-icon" ></i>
          </van-field>
        </van-cell-group>
        <van-cell-group title="店铺封面图" class="item-div phoneDiv1" >
          <span></span>
          <van-uploader v-model="fileList" :max-count="1" />
        </van-cell-group>
        <van-cell-group title="店铺公告" >
          <van-field
            v-model="shopInfo.announcement"
            rows="2"
            autosize
            type="textarea"
            placeholder="请输入店铺公告"
          />
        </van-cell-group>
        <section class="btn-div" >
          <div class="cancel-btn" @click="cancel_oper" >取消</div>
          <div class="save-btn" @click="saveShop" >保存</div>
        </section>
      </section>
    </van-popup>

    <van-popup
      v-model="showMap"
      position="top"
      :style="{ height: '100%' }"
    >
      <iframe id="mapPage" width="100%" height="100%" frameborder=0
              src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=J7GBZ-KOEWO-YY5W4-SKQVK-ZJRQK-MKFLQ&referer=goldfish">
      </iframe>
    </van-popup>
  </section>
</template>

<script>
import marketService from '../../service/bolosev'
import {mapGetters,mapState} from 'vuex'
import {EventBus} from '../../components/common/EventBus'
export default {
  name: 'home',
  data () {
    return {
      showMap: false,
      showEd: false,
      shopInfo: {
        ShopLocation: "信合路南段信合路南段信合路南段信合路南段信合路南段信合路南段信合路南段",
        announcement: ''
      },
      fileList: [],
    }
  },
  created(){
    let _this = this;
    EventBus.$on("positionBack",({latlng,poiaddress,cityname,poiname})=>{
      console.log("------mapBack")
      let {lat,lng} = latlng
      _this.showMap = false;
      _this.shopInfo.lat = lat;
      _this.shopInfo.lon = lng;
      _this.shopInfo.ShopLocation = poiaddress + poiname;
    })
    document.title = "我的店铺";
    // return;
    this.initShop();
  },
  mounted(){
    console.log('=======>>jsLoaded',this.jsLoaded)
    if (this.jsLoaded)
    {
      this.initWx();
    }
  },
  methods: {
    initShop(){
      let _this = this;
      marketService.my_shop().then(res=>{
        if (res.code==0)
        {
          if (res.data.length>0)
          {
            let shopInfo = res.data[0]
            _this.shopInfo = shopInfo
            let {id,lat,lon} = shopInfo
            _this.fileList = [{name:'cover',url:shopInfo.cover}]
            this.$store.commit("setShop",id)
            this.$store.commit("setPos",{lat,lon})
            this.$store.commit("setInd",shopInfo.ShopIndustry)
          }
          else
            this.$toast.fail("系统没有找到您的店铺")
        }
        else
          this.$toast.fail("获取店铺信息超时")
      })
    },
    update_one(){
      let _this = this;
      return new Promise((ress,rejj)=>{
        if (_this.fileList==0)
        {
          ress(0)
          return;
        }
        let file = _this.fileList[0]
        let fm = new FormData();
        fm.append("filepath",file.file,file.file.name)
        marketService.uploads(fm).then(res=>{
          if (res.code==0)
          {
            ress({path:'/' +res.data.path})
          }
          else
          {
            rejj(1)
          }
        })
      })
    },
    saveShop(){
      let _this = this;
      this.update_one().then(par=>{
        let {id,ShopLocation,lon,cover,lat,announcement} = _this.shopInfo;
        if (par)
          cover = par.path
        marketService.edit_shop({shop_id:id,ShopLocation,lon,lat,announcement}).then(res=>{
          if (res.code==0)
          {
            _this.fileList = [];
            _this.showEd = false;
            _this.initShop();
          }
          else
          {
            _this.$toast.fail('服务器宕机了，555~');
          }
        })
      },rej=>{
        _this.$toast.fail("上传图片超时")
      })
    },
    cancel_oper(){
      this.showEd = false;
    },
    showEdit(){
      this.showEd = true;
    },
    getLoc(){
      let _this = this;
      this.showMap = true;
    },
    initWx(){
      marketService.get_wxcfg({uri:location.href.split('#')[0]}).then(res=>{
        if (res.code==0){
          console.log('-=-====res.data',res.data)
          let data = res.data
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.AppId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名
            jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline"] // 必填，需要使用的JS接口列表
          })
          wx.error(function(res){
            console.log('=====wxerror',res)
          });
          wx.ready(()=>{
            wx.checkJsApi({
              jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function(res) {
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                console.log('----check',res)
              }
            });

            wx.onMenuShareAppMessage({
              title: '再见，再见', // 分享标题
              desc: 'aaaaaa', // 分享描述
              link: "https://shop.dayu1.net/api/normal_user_info/", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: "https://www.dayu1.net/static/img/biglogo.ee0dc6b.png", // 分享图标
              success: function () {
                // 设置成功
                alert("-----设置分享给朋友成功")
              },
              error(e) {
                alert(JSON.stringify(e))
              }
            })

            wx.onMenuShareTimeline({
              title: '再见aaa，再见', // 分享标题增值税改革亮点
              link: "https://shop.dayu1.net/api/normal_user_info/", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: "https://www.dayu1.net/static/img/biglogo.ee0dc6b.png", // 分享图标
              success: function () {
                // 设置成功
//                alert("-----设置分享到朋友圈成功")
                _this.$toast("分享给朋友圈设置成功")
                console.log('555555555555555555555555555')
              },
              error(e) {
                alert(JSON.stringify(e))
              }
            })

          })

        }
        else
          this.$toast.fail("获取微信配置超时")
      })
    }
  },
  computed:{
    ...mapState([
      'jsLoaded',
    ]),
    ...mapGetters([
      'getJs'
    ])
  },
  watch: {
    getJs(hasJs) { //li就是改变后的wifiList值
      console.log('======hasJs',hasJs)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/sass-base';
  @import '../../assets/css/basestyle';
  .homePage{
    display: flex;
    flex-direction: column;
  }
  .homeHead{
    display: flex;
    flex-direction: row;
    margin-top: 50px;
    align-items: flex-end;
    justify-content: space-between;
  }
  .homeHead>i{
    margin-right: 25px;
  }
  .shop_tit{
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }
  .homeTitle{
    font-weight: bold;
    font-size: 36px;
    color: #333333;
    margin-left: 25px;
    margin-right: 20px;
  }
  .titlelit{
    font-weight: bold;
    font-size: 24px;
    color: #008000;
  }
  .expireTime{
    color: #a04000;
    font-size: 28px;
    display: flex;
    flex-direction: row;
    margin-top: 25px;
  }
  .expireTime>span:first-child{
    margin-left: 25px;
  }
  .expireTime>span:last-child{
    margin-left: 50px;
    border-bottom: 1px solid #a04000;
    padding-bottom: 3px;
  }
  .entryDiv{
    width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    border-radius: 10px;
  }
  .todayDiv{
    margin-left: 25px;
    margin-top: 25px;
    font-size: 32px;
  }
  .todayMoney{
    margin:25px 0 70px 0;
    font-size: 60px;
    font-weight: bold;
    color: $base_green;
    text-align: center;
  }
  .dialogDiv{
    width: 700px;
    height: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    border-radius: 10px;
  }
  .positionDiv{
    line-height: 42px;
    font-size: 32px;
    width: 700px;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    flex-direction: row;
  }
  .positionDiv>.add_info{
    flex: 1;
  }
  .fixedPosition{
    cursor: pointer;
    color: #a04000;
    margin-left: 50px;
    border-bottom: 1px solid #a04000;
    padding-bottom: 3px;
  }

  .edit-shop{
    display: flex;
    flex-direction: column;
  }
  .edit-shop>header{
    display: flex;
    flex-direction: row;
    height: 80px;
    line-height: 80px;
  }
  .edit-shop>header>label{
    margin-left: 25px;
    font-weight: bold;
    font-size: 32px;
  }
  .edit-shop>div{
    margin-bottom: 20px;
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
  .btn-div{
    display: flex;
    flex-direction: row;
    height: 80px;
    line-height: 80px;
  }
  .btn-div>div{
    flex: 1;
  }
  .cancel-btn{
    background: #fff;
    color: #333;
    font-size: 32px;
    text-align: center;
  }
  .save-btn{
    background: #FF7D00;
    color: #fff;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
  }
</style>
