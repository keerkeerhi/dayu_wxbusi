<template>
  <section class="customerPage" >
    <section class="customerCont global_shadow" >
      <header>
        <label>顾客</label>
      </header>
      <section class="custList" >
        <template v-if="customerList.length>0" >
          <header>共<span style="font-weight: bold;" >{{customerList.length}}</span>人</header>
          <ul>
            <li class="customerItem" v-for="it in customerList" >
              <img />
              <section class="itemWords" >
                <div>
                  <span>{{it.username}}</span>
                  <span>消费<span style="font-weight: bold;">{{it.times}}</span>次</span>
                </div>
                <div>
                  <span class="phonenum" >{{it.phone}}</span>
                  <span>共计<span style="font-weight: bold;" >{{it.total}}</span>元</span>
                </div>
              </section>
            </li>
          </ul>
        </template>
        <div v-else class="noPerson" >
          <div>
            暂时没有顾客，加油！
          </div>
          <div>
            快去分享店铺到朋友圈！
          </div>
        </div>
      </section>
    </section>
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
        name: "Customer",
        created()
        {
          document.title = "我的顾客"
        },
        data(){
          return {
            customerList:[
              {username:'郑晓峰',phone:'15537232100',total:1000000,times:1000},
              {username:'郑晓峰',phone:'15537232100',total:1000000,times:1000}
            ]
          }
        }
    }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/sass-base';
  @import '../../assets/css/basestyle';
  .customerPage{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: $base_background;
    color: #333333;
  }
  .customerCont{
    width: 700px;
    margin: 0 auto;
    margin-top: 40px;
    >header{
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      height: 90px;
      line-height: 90px;
      background: $base_color;
      >label{
        font-weight: bold;
        font-size: 32px;
        margin-left: 40px;
        color: #fff;
        letter-spacing: 12px;
      }
    }
    >.custList{
      background: #fff;
      >header{
        height: 54px;
        line-height: 54px;
        text-align: center;
        font-size: 28px;
      }
      >.noPerson{
        height: 300px;
        font-size: 32px;
        font-weight: bold;
        color: $base_orange;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 48px;
      }
      .customerItem{
        display: flex;
        flex-direction: row;
        width: 680px;
        margin: 0 auto;
        border-top: 1px solid #e6e5e7;
        height: 155px;
        align-items: center;
        >img{
          margin-left: 20px;
          width: 105px;
          height: 105px;
          border-radius: 6px;
          margin-right: 35px;
        }
        >.itemWords{
          flex: 1;
          font-size: 28px;
          >div{
            margin-right: 20px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          >div:first-child{
            margin-bottom: 20px;
          }
          .phonenum{
            font-weight: bold;
            font-size: 32px;
            color: $base_green;
            border-bottom: 1px solid $base_green;
            padding-bottom: 3px;
          }
        }
      }
    }
  }
</style>
