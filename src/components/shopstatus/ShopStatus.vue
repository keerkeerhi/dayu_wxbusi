<template>
    <section class="statusPage" >
      <van-icon color="#FFE300" name="smile-o" />
      <label class="statusWords" >您的店铺正在审核中，请关注公众号的审核结果提醒！</label>
    </section>
</template>

<script>
  export default {
    name: 'ShopStatus'
  }
</script>

<style scoped>
  .statusPage{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-items: center;
    justify-content: center;
  }
  .statusWords{
    margin-top: 8vw;
  }
</style>
