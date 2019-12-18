<template>
    <section class="editPage" >
      <van-cell-group class="item-div" >
        <van-field v-model="product.name" required placeholder="请输入店铺名称" />
      </van-cell-group>
      <van-cell-group class="item-div" >
        <van-field
          v-model="product.price"
          required
          clearable
          placeholder="请输入商品价格"
        >
          <label slot="right-icon" >元</label>
        </van-field>
      </van-cell-group>

      <van-cell-group class="item-div phoneDiv1" >
        <span>商品封面</span>
        <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" />
      </van-cell-group>

      <van-cell-group class="item-div phoneDiv1" >
        <span>详情图片</span>
        <section class="detail-imgs" >
          <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" />
          <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" />
          <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" />
          <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" />
          <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" />
          <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" />
        </section>
      </van-cell-group>

      <van-cell-group class="item-div" >
        <van-field
          v-model="product.mark"
          rows="2" autosize
          label="商品描述"
          type="textarea"
          placeholder="请输入商品描述"
        />
      </van-cell-group>

      <van-cell-group class="item-div" >
        <van-field
          v-model="product.num"
          required
          clearable
          placeholder="请输入数量"
        >
          <label slot="right-icon" >个</label>
        </van-field>
      </van-cell-group>

      <van-cell-group class="item-div" >
        <van-switch-cell v-model="product.isSend" title="是否送货" />
      </van-cell-group>

      <van-cell-group class="item-div" >
        <van-switch-cell v-model="product.isRush" title="是否抢购" />
      </van-cell-group>

      <template v-if="product.isRush" >
        <van-cell-group>
          <van-field
            readonly
            clickable
            label="开始时间"
            :value="product.startTime"
            placeholder="开始时间"
            @click="showStart = true"

          />
          <van-popup v-model="showStart" position="bottom">
            <van-datetime-picker
              v-model="startTime"
              type="datetime"
              @cancel="showStart = false"
              @confirm="onConfirm"
              :formatter="formatter"
            />
          </van-popup>
        </van-cell-group>

        <van-cell-group>
          <van-field
            readonly
            clickable
            label="结束时间"
            :value="product.endTime"
            placeholder="结束时间"
            @click="showEnd = true"
          />
          <van-popup v-model="showEnd" position="bottom">
            <van-datetime-picker
              v-model="endTime"
              type="datetime"
              @cancel="showEnd = false"
              @confirm="onConfirm2"
              :formatter="formatter"
            />
          </van-popup>
        </van-cell-group>
      </template>

      <div class="bottom-btn" >
        <button class="normal-btn" @click="toSave" >保存商品</button>
      </div>
    </section>
</template>

<script>
  import {dateFormat} from '../common/Util';

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
              isRush: true,
              startTime: '',
              endTime: ''
            },
            startTime: new Date(),
            endTime: new Date(new Date().getTime()+1000*60*60*24),
            fileList:[],
            showStart:false,
            showEnd:false
          }
        },
        created(){
            document.title = "添加商品";
        },
        methods:{
          toSave(){

          },
          formatter(type, value) {
            if (type === 'year') {
              return `${value}年`;
            } else if (type === 'month') {
              return `${value}月`
            }
            return value;
          },
          afterRead(file){
            // 此时可以自行将文件上传至服务器
            console.log(file);
          },
          onConfirm(value) {
            this.product.startTime = dateFormat(value,"yyyy-MM-dd hh:mm:ss");
            this.showStart = false;
          },
          onConfirm2(value) {
            this.product.endTime = dateFormat(value,"yyyy-MM-dd hh:mm:ss");
            this.showStart = false;
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
  .phoneDiv1{
    padding-top: 50px;
    padding-bottom: 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .phoneDiv1>span:first-child{
    min-width: 146px;
    font-size: 28px;
    /*color: rgb(150,151,153);*/
    margin-right: 20px;
    margin-left: 26px;
  }
  .detail-imgs{
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .normal-btn{
    border-radius: 10px;
    height: 84px;
    width: 700px;
  }
  .bottom-btn{
    margin: 5.333vw 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>
