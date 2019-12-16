<template>
    <section>
      product.....
      <van-tabbar route >
        <van-tabbar-item replace to="/home" icon="home-o" >我的店铺</van-tabbar-item>
        <van-tabbar-item replace to="/customer" icon="friends-o">我的顾客</van-tabbar-item>
        <!--<van-tabbar-item name="search" icon="search">招聘</van-tabbar-item>-->
        <van-tabbar-item replace to="/product" icon="setting-o">我的商品</van-tabbar-item>
      </van-tabbar>
    </section>
</template>

<script>
    export default {
        name: "Product",
        created()
        {
          document.title = "商品管理"
        },
    }
</script>

<style scoped>

</style>
