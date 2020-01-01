<template>
    <section>
      order.............
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
    name: 'Order',
    data()
    {
      return {
        orderList:[]
      };
    },
    created()
    {
      document.title = "订单管理"
      return;
      let shopId = this.$store.state.shopId
      console.log('==2==>>',this.shopId,shopId)
      marketService.my_product({shop_id:shopId}).then(res=>{
        if (res.code==0)
        {
          console.log('---cus',res.data)
          this.orderList = res.data;
        }
        else
          this.$toast.fail("获取顾客信息超时")
      })
    }
  }
</script>

<style scoped>

</style>
