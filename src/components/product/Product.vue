<template>
    <section class="productPage" >
      <header class="stuNav" >
        <div :class='{stuNI:true,active:navIndex==0}' data-inx="0"
             @click='toNav(0)'
        >
          商品管理
        </div>
        <div class='stuNL' ></div>
        <div :class='{stuNI:true,active:navIndex==1}' data-inx="1"
              @click='toNav(1)' >
          种类管理
        </div>
      </header>
      <section class="product-list" >
        <van-collapse v-model="activeId" accordion >
          <van-collapse-item v-for="(it,it_index) in pList" :name="it.id">
            <section class="productItem"  slot="title">
              <img :src="'https://' + imgBase + '/' + it.img1"  />
              <section class="itemCont" >
                <div class="protit" >
                  <span>{{it.name}}</span>
                  <span><span class="priceNum">{{it.price}}</span>元</span>
                </div>
                <div class="pmark" >
                  {{it.mark}}
                </div>
                <div class="statusDiv" >
                  <div :style="{background:it.IfShelf==0?'#6c9000':'#a04000'}" class="statusWord" >
                    {{it.IfShelf==0?'已上架':'已下架'}}
                  </div>
                </div>
              </section>
            </section>
            <section class="btns" >
              <button v-if="it.IfShelf==0" @click="take_pro(it_index,it.id,1)" class="normal-btn lower" >下架</button>
              <button v-else class="normal-btn upper" @click="take_pro(it_index,it.id,0)" >上架</button>
              <button class="normal-btn edit" @click="toEdit(it.id)" >编辑</button>
              <button class="normal-btn delete" @click="delPro(it_index,it.name,it.id)" >删除</button>
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

      <router-link v-if="navIndex==0" tag="div" to="/edit/-1" class="addPro global_shadow" >
        <van-icon size="48" name="add-o" />
      </router-link>
      <div v-else @click="addType" class="addPro global_shadow" >
        <van-icon size="48" name="add-o" />
      </div>
    </section>
</template>

<script>
  import marketService from '../../service/bolosev'
  import {Domain} from '../../components/common/globaldata'
    export default {
        name: "Product",
        data(){
          return {
            navIndex: 0,
            imgBase: Domain.host,
            activeId: 0,
            pList:[],
            showAdd:false
          }
        },
        created()
        {
          document.title = "商品管理"
          let shopId = this.$store.state.shopId
          console.log('==2==>>',this.shopId,shopId)
          return;
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
        addType(){

        },
        toNav(inx)
        {
          this.navIndex = inx;
        },
        delPro(index,com_name,com_id)
        {
          let _this = this
          this.$dialog.confirm({
            title: '确认',
            message: `确认删除${com_name}?`
          }).then(() => {
            // on confirm
            marketService.del_com({com_id}).then(res=>{
              if (res.code==0)
              {
                _this.pList.splice(index,1);
                _this.$toast.success("已删除")
              }
              else
                _this.$toast.fail("操作超时")
            })
          }).catch(() => {
            // on cancel
          });
        },
        take_pro(index,com_id,IfShelf){
          this.pList[index].IfShelf = IfShelf
          marketService.take_com({com_id,IfShelf}).then(res=>{
            if (res.code==0)
            {
              this.$toast.success("操作成功")
            }
            else
            {
              this.$toast.fail("操作超时");
            }
          })
        },
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
      display: flex;
      flex-direction: column;
    }
  }
  .product-list{
    margin-bottom: 105px;
  }
  .addPro{
    position: absolute;
    bottom: 105px;
    left: 0;
    right: 0;
    margin: auto;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .stuNav{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100px;
    background: #150080;
  }
  .stuNL{
    height: 60px;
    background: #fff;
    width: 2px;
  }
  .stuNI{
    color: #fff;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 34px;
  }
  .stuNI.active{
    font-size: 36px;
    font-weight: bold;
  }
</style>
