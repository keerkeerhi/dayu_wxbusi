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
        console.log('======res',res)
      })
      return;
      if (isFirst)
        this.$router.push("/Home")
      else
        this.$router.push("/Begin")
    }
  }
</script>
