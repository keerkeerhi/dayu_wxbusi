<template>
    <section class="editPage" >
      <van-cell-group class="item-div" >
        <van-field v-model="product.name" placeholder="请输入店铺名称" />
      </van-cell-group>
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
