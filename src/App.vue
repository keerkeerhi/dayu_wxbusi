<template>
  <router-view/>
</template>

<script>
  import './App.scss'
  export default {
    name: 'App',
    data() {
      return {
      }
    },
    created() {
      return;
      let isFirst = localStorage.getItem("isFirst");
      if (isFirst)
        this.$router.push("/Home")
      else
        this.$router.push("/Begin")
    }
  }
</script>
