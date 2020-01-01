<template>
    <section class="productPage" >
      <section>
        <van-collapse v-model="activeId" accordion >
          <van-collapse-item v-for="it in pList" :name="it.id">
            <section class="productItem"  slot="title">
              <img src="{{imgBase + it.img1}}"  />
              <section class="itemCont" >
                <div class="protit" >
                  <span>{{it.name}}</span>
                  <span><span class="priceNum">{{it.price}}</span>元</span>
                </div>
                <div class="pmark" >
                  {{it.mark}}
                </div>
                <div class="statusDiv" >
                  <div :style="{background:it.status==1?'#6c9000':'#a04000'}" class="statusWord" >
                    {{it.status==1?'已上架':'已下架'}}
                  </div>
                </div>
              </section>
            </section>
            <section class="btns" >
              <button v-if="it.status==1" class="normal-btn lower" >下架</button>
              <button v-else class="normal-btn upper" >上架</button>
              <button class="normal-btn edit" @click="toEdit(it.id)" >编辑</button>
              <button class="normal-btn delete">删除</button>
              <button class="normal-btn preview">预览</button>
            </section>
          </van-collapse-item>
        </van-collapse>
      </section>
      <van-tabbar route >
        <van-tabbar-item replace to="/home" icon="home-o" >我的店铺</van-tabbar-item>
        <van-tabbar-item replace to="/customer" icon="friends-o">我的顾客</van-tabbar-item>
        <van-tabbar-item replace to="/order" icon="balance-list-o">我的订单</van-tabbar-item>
        <van-tabbar-item replace to="/product" icon="setting-o">我的商品</van-tabbar-item>
      </van-tabbar>

      <router-link tag="div" to="/edit/-1" class="addPro global_shadow" >
        <van-icon size="48" name="add-o" />
      </router-link>

    </section>
</template>

<script>
  import marketService from '../../service/bolosev'
  import {Domain} from '../../components/common/globaldata'
    export default {
        name: "Product",
        data(){
          return {
            imgBase: Domain.host,
            activeId: 0,
            pList:[]
          }
        },
        created()
        {
          document.title = "商品管理"
          let shopId = this.$store.state.shopId
          console.log('==2==>>',this.shopId,shopId)
          marketService.my_product({shop_id:shopId}).then(res=>{
              if (res.code==0)
              {
                console.log('---cus',res.data)
                this.pList = res.data;
              }
              else
                this.$toast.fail("获取顾客信息超时")
        })
      },
      methods: {
        toEdit(id){
          this.$router.push('/edit/'+id)
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/sass-base';
  @import '../../assets/css/basestyle';
  .btns{
    .normal-btn{
      font-size: 32px;
      width: 160px;
      height: 60px;
    }
    .delete{
      background: $base_red;
      &:active{
        background: #BD081D;
      }
    }
    .lower{
      background: #a04000;
      &:active{
        background: #6E2C00;
      }
    }
    .upper{
      background: $base_green;
      &:active{
        background: #004E00;
      }
    }
    .edit{
      background: $base_color;
      &:active{
        background: #0D004E;
      }
    }
    .preview{
      background: #5C5FFF;
      &:active{
        background: #282DFF;
      }
    }
  }
  .productItem{
    display: flex;
    flex-direction: row;
    height: 170px;
    >img{
      height: 140px;
      width: 140px;
      border-radius: 8px;
      margin-right: 30px;
    }
    .itemCont{
      flex: 1;
      >.protit{
        font-size: 32px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
       >span:first-child{
         font-weight: bold;
       }
       >span:last-child{
         margin-right: 20px;
       }
        .priceNum{
          font-weight: bold;
          font-size: 38px;
          color: $base_yellow;
        }
      }
    }
    .pmark{
      font-size: 28px;
      color: #666666;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .statusDiv{
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
    .statusWord{
      color: #fff;
      width: 100px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      font-size: 18px;
      border-radius: 8px;
    }
    .productPage{
      position: relative;
      min-height: 100vh;
    }
  }
  .addPro{
    position: absolute;
    bottom: 85px;
    left: 0;
    right: 0;
    margin: auto;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: #fff;
  }
</style>
