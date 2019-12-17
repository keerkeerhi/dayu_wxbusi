<template>
    <section class="editPage" >
      <van-cell-group class="item-div" >
        <van-field v-model="product.name" required placeholder="请输入店铺名称" />
      </van-cell-group>
      <van-field
        v-model="product.price"
        required
        clearable
        placeholder="请输入价格"
      >
        <label slot="right-icon" >元</label>
      </van-field>
    </section>
</template>

<script>
    export default {
        name: "Edit",
        data(){
          return {
            product:{
              name:'',
              price:'',
              imgs:[],
              mark:'',
              num:'',
              isSend: false,
              isRush: false,
              startTime: '',
              endTime: ''
            }
          }
        }
    }
</script>

<style scoped>
  .editPage{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #F8F8F8;
  }
  .item-div{
    margin-top: 40px;
  }
</style>
