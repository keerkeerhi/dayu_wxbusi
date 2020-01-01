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
      <span class="fixedPosition" >重新定位</span>
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
        _this.shopInfo = res.data
      }
      else
        this.$toast.fail("获取店铺信息超时")
    })
  },
  methods: {
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
