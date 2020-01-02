<template>
  <router-view/>
</template>

<script>
  import './App.scss'
  import marketService from './service/bolosev'
  import {dynamicLoadJs} from './components/common/Util'
  export default {
    name: 'App',
    data() {
      return {

      }
    },
    mounted() {
      // return;
      this.initWx()
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
          marketService.get_wxcfg({uri:location.href.split('#')[0]}).then(res=>{
            if (res.code==0){
              console.log('-=-====res.data',res.data)
              let data = res.data
              wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.AppId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名
                jsApiList: ["onMenuShareAppMessage","getLocation","onMenuShareTimeline","openLocation"] // 必填，需要使用的JS接口列表
              })
              wx.error(function(res){
                console.log('=====wxerror',res)
              });
              wx.ready(()=>{
                wx.checkJsApi({
                  jsApiList: ["onMenuShareAppMessage","getLocation","onMenuShareTimeline","openLocation"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                  success: function(res) {
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    console.log('----check',res)
                  }
                });

                wx.onMenuShareAppMessage({
                  title: '再见，再见', // 分享标题
                  desc: 'aaaaaa', // 分享描述
                  link: "https://shop.dayu1.net/api/normal_user_info/", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: "https://www.dayu1.net/static/img/biglogo.ee0dc6b.png", // 分享图标
                  success: function () {
                    // 设置成功
                    alert("-----设置分享给朋友成功")
                  },
                  error(e) {
                    alert(JSON.stringify(e))
                  }
                })

                wx.onMenuShareTimeline({
                  title: '再见aaa，再见', // 分享标题增值税改革亮点
                  link: "https://shop.dayu1.net/api/normal_user_info/", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: "https://www.dayu1.net/static/img/biglogo.ee0dc6b.png", // 分享图标
                  success: function () {
                    // 设置成功
//                alert("-----设置分享到朋友圈成功")
                    _this.$toast("分享给朋友圈设置成功")
                    console.log('555555555555555555555555555')
                  },
                  error(e) {
                    alert(JSON.stringify(e))
                  }
                })
              })

            }
            else
              this.$toast.fail("获取微信配置超时")
          })

        })
      }
    }
  }
</script>
