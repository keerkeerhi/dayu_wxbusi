<template>
  <section class="homePage" >
    <header class="homeHead" >
      <div class="homeTitle" >
        安阳大玉网络科技有限公司
      </div>
      <div class="titlelit" >好评率 100% </div>
    </header>
    <van-tabbar route >
      <van-tabbar-item replace to="/home" icon="home-o" >我的店铺</van-tabbar-item>
      <van-tabbar-item replace to="/customer" icon="friends-o">我的顾客</van-tabbar-item>
      <!--<van-tabbar-item name="search" icon="search">招聘</van-tabbar-item>-->
      <van-tabbar-item replace to="/product" icon="setting-o">我的商品</van-tabbar-item>
    </van-tabbar>
  </section>
</template>

<script>
import marketService from '../../service/bolosev'
import {isArray} from "../common/Util"

export default {
  name: 'home',
  data () {
    return {
      dataList: []
    }
  },
  created(){
    document.title = "我的店铺"
    // 只支持hot
    // marketService.query_market({t_type:'all'}).then(res => {
    //   if (isArray(res.data))
    //     this.dataList = res.data
    // })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/sass-base';
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
    font-size: 24px;
    color: #f8080d;
  }
</style>
