<template>
  <section class="homePage" >
    <header class="homeHead" >
      <div class="homeTitle" >
        {{shopInfo.ShopName}}
      </div>
      <div class="titlelit" >好评率 100% </div>
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
      <span>店铺位置：{{shopInfo.ShopLocation}}</span>
      <span class="fixedPosition" @click="getLocc" >重新定位</span>
    </div>
    <van-tabbar route >
      <van-tabbar-item replace to="/home" icon="home-o" >我的店铺</van-tabbar-item>
      <van-tabbar-item replace to="/customer" icon="friends-o">我的顾客</van-tabbar-item>
      <van-tabbar-item replace to="/order" icon="balance-list-o">我的订单</van-tabbar-item>
      <van-tabbar-item replace to="/product" icon="setting-o">我的商品</van-tabbar-item>
    </van-tabbar>
  </section>
</template>

<script>
import marketService from '../../service/bolosev'
import {mapGetters,mapState} from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      shopInfo: []
    }
  },
  created(){
    document.title = "我的店铺"
    let _this = this;
    marketService.my_shop().then(res=>{
      if (res.code==0)
      {
        if (res.data.length>0)
        {
          _this.shopInfo = res.data[0]
          this.$store.commit("setShop",_this.shopInfo.id)
        }
        else
          this.$toast.fail("系统没有找到您的店铺")
      }
      else
        this.$toast.fail("获取店铺信息超时")
    })
  },
  mounted(){
    console.log('=======>>jsLoaded',this.jsLoaded)
    if (this.jsLoaded)
    {
      this.initWx();
    }
  },
  methods: {
    getLocc(e){

      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          wx.openLocation({
            latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
            longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
            name: '', // 位置名
            address: '', // 地址详情说明
            scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: '', // 在查看位置界面底部显示的超链接,可点击跳转
            success(suc){
              console.log('====succss',suc)
            },
            fail(msg){
              console.log('-----fail',msg)
            }
          });
        }
      });
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
            jsApiList: ["onMenuShareAppMessage","getLocation","onMenuShareTimeline","openLocation"] // 必填，需要使用的JS接口列表
          })
          wx.error(function(res){
            console.log('=====wxerror',res)
          });
          wx.ready(()=>{
            wx.checkJsApi({
              jsApiList: ["onMenuShareAppMessage","getLocation","onMenuShareTimeline","openLocation"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
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
    font-size: 32px;
    width: 700px;
    margin: 0 auto;
    margin-top: 50px;
  }
  .fixedPosition{
    cursor: pointer;
    color: #a04000;
    margin-left: 50px;
    border-bottom: 1px solid #a04000;
    padding-bottom: 3px;
  }
</style>
