<template>
  <router-view/>
</template>

<script>
  import './App.scss'
  import marketService from './service/bolosev'
  export default {
    name: 'App',
    data() {
      return {

      }
    },
    created() {
      marketService.shopStatus().then(res=>{
        if (res.code==0)
        {
          switch(res.data){
            // 则店铺未提交审核
            case -1:
              this.$router.push("/Begin")
              break;
            // 店铺审核未通过
            case 2:
              // 未通过审核发送模版消息
              this.$toast.fail('您的店铺信息未通过审核，请重新填写资料！');
              setTimeout(()=>{
                this.$router.push("/Register")
              },800)
              break;
            // 则店铺正在审核中
            case 0:
              this.$router.push("/shopstatus")
              this.$
              break;
            // 则店铺审核已通过
            case 1:
              this.$router.push("/home")
              break;
          }
        }
        else
        {
          this.$toast.fail('获取数据超时');
        }
      })
      return;
      if (isFirst)
        this.$router.push("/Home")
      else
        this.$router.push("/Begin")
    }
  }
</script>
