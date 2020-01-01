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
  export default {
    name: 'Order'
  }
</script>

<style scoped>

</style>
