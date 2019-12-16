<template>
  <section style="background: #150080;" >
    <swiper :options="swiperOption">
      <swiper-slide v-for="(it,inx) in imgs" :key="inx" >
        <div class="myImg" :style="{backgroundImage:`url(${it})`}" >
          <div v-if="inx==2" class="bottom-btn" >
            <button @click="settledIn" class="normal-btn" >免费入驻</button>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </section>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import img1 from '../../assets/imgs/1.png'
    import img2 from '../../assets/imgs/2.png'
    import img3 from '../../assets/imgs/3.png'

    export default {
        name: "Begin",
        data(){
          return {
            imgs:[img1,img2,img3],
            swiperOption: {
              pagination: {
                el: '.swiper-pagination'
              }
            }
          }
        },
        created()
        {
          document.title = "小金鱼商户平台"
        },
        methods:{
          settledIn(){
            this.$router.push("/Register")
          }
        },
        components: {
          swiper,
          swiperSlide
        }
    }
</script>
<style scoped >
  .myImg{
    width: 100vw;
    height: 100vh;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .bottom-btn{
    width: 100vw;
    position: absolute;
    z-index: 10000;
    bottom: 113px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .normal-btn{
    border-radius: 10px;
    height: 84px;
    width: 325px;
  }
</style>
