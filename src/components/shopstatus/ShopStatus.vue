<template>
    <section class="statusPage" >
      <van-icon size="65" color="#1AAD19" name="smile-o" />
      <label class="statusWords" >您的店铺正在审核中，请关注<label style="font-weight: bold;margin: 0 5px;" >公众号</label>以便收到审核结果提醒！</label>
      <img src="../../assets/imgs/qrcode.jpg"/>
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
  .statusPage>i{
    margin-top: 15%;
  }
  .statusPage>img{
    margin-top: 10vw;
    width: 33vw;
    height: 33vw;
  }
  .statusWords{
    font-size: 36px;
    line-height: 54px;
    max-width: 60vw;
    margin-top: 8vw;
  }
</style>
