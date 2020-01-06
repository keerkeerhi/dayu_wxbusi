<template>
  <router-view/>
</template>

<script>
  import './App.scss'
  import marketService from './service/bolosev'
  import {dynamicLoadJs} from './components/common/Util'
  import {EventBus} from './components/common/EventBus'
  export default {
    name: 'App',
    data() {
      return {

      }
    },
    created(){
      window.addEventListener('message', function(event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data;
        if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          EventBus.$emit("positionBack",loc)
        }
      }, false);
    },
    mounted() {
      return;
      this.initWx()
      marketService.shopStatus().then(res=>{
        if (res.code==0)
        {
          // res.data = 2;
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
    },
    methods:{
      initWx(){
        let _this = this;
        dynamicLoadJs("https://res.wx.qq.com/open/js/jweixin-1.4.0.js",()=>{
          _this.$store.commit("setJs",true)
        })
      }
    }
  }
</script>
