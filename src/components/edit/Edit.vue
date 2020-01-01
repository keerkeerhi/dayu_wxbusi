<template>
    <section class="editPage" >
      <van-cell-group class="item-div" >
        <van-field v-model="product.name"
                   clearable required placeholder="请输入商品名称" />
      </van-cell-group>
      <van-cell-group class="item-div" >
        <van-field
          type = "number"
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
        <van-uploader v-model="imgs.img1" :max-count="1" />
      </van-cell-group>

      <van-cell-group class="item-div phoneDiv1" >
        <span>详情图片</span>
        <section class="detail-imgs" >
          <van-uploader v-model="imgs.img2" :max-count="1" />
          <van-uploader v-model="imgs.img3" :max-count="1" />
          <van-uploader v-model="imgs.img4" :max-count="1" />
          <van-uploader v-model="imgs.img5" :max-count="1" />
          <van-uploader v-model="imgs.img6" :max-count="1" />
          <!--<van-uploader v-model="fileList" :max-count="1" />-->
        </section>
      </van-cell-group>

      <van-cell-group class="item-div" >
        <van-field
          v-model="product.details"
          rows="2" autosize
          label="商品描述"
          type="textarea"
          placeholder="请输入商品描述"
        />
      </van-cell-group>

      <van-cell-group class="item-div" >
        <van-field
          v-model="product.total"
          type="number"
          required
          clearable
          placeholder="请输入数量"
        >
          <label slot="right-icon" >个</label>
        </van-field>
      </van-cell-group>

      <van-cell-group class="item-div" >
        <van-switch-cell active-value="0" inactive-value="1"  v-model="product.IfDelivery" title="是否送货" />
      </van-cell-group>

      <van-cell-group class="item-div" >
        <van-switch-cell active-value="0" inactive-value="1" v-model="product.PanicBuying" title="是否抢购" />
      </van-cell-group>

      <template v-if="product.PanicBuying==0" >
        <van-cell-group>
          <van-field
            readonly
            clickable
            label="开始时间"
            :value="product.StartTime"
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
            :value="product.EndTime"
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
  import {Domain} from '../../components/common/globaldata'
  import marketService from '../../service/bolosev'
    export default {
        name: "Edit",
        props: ['id'],
        data(){
          return {
            imgBase: Domain.host,
            product:{
              name:'',
              price:'',
              files:'',
              details:'',
              total:'',
              // 是否送货
              IfDelivery: 1,
              //  是否抢购
              PanicBuying: 1,
              StartTime: '',
              EndTime: '',
              IfShelf: true,
              // 尺寸
              size: '',
              label:'',
              img1:'',
              img2:'',
              img3:'',
              img4:'',
              img5:'',
              img6:'',
            },
            startTime: new Date(),
            endTime: new Date(new Date().getTime()+1000*60*60*24),
            imgs:{img1:[],img2:[],img3:[],img4:[],img5:[],img6:[]},
            showStart:false,
            showEnd:false
          }
        },
        created(){
          document.title = "添加商品";
          this.shopId = this.$store.state.shopId
          console.log('====productId',this.id)
          let _this = this
          if (this.id>0)
          {
            // 获取产品信息
            marketService.pro_detail({com_id:_this.id}).then(res=>{
              if (res.code==0)
              {
                let info = res.data[0]
                _this.product = info;
                for (let key in info)
                {
                  if (key.indexOf('img')>-1)
                  {
                    if (info[key])
                      _this.imgs[key]= [{name:key,url:'https://' + _this.imgBase + '/' + info[key]}]
                  }
                }
                console.log('====imgs',_this.imgs)
              }
              else
                _this.$toast.fail("获取商品信息超时")
            })
          }
        },
        methods:{
          update_one(key,file){
            return new Promise((ress,rejj)=>{
              if (!file.file)
              {
                ress({key,path:file.url})
                return;
              }
              let fm = new FormData();
              fm.append("filepath",file.file,file.file.name)
              marketService.uploads(fm).then(res=>{
                if (res.code==0)
                {
                  ress({key,path:res.data.path})
                }
                else
                {
                  rejj(1)
                }
              })
            })
          },
          upload_all(){
            let _this = this;
            return new Promise((resolve,reject)=>{
              let ps = [];
              for(let key in _this.imgs){
                _this.imgs[key].forEach(img=>{
                  console.log('=====img',img)
                  ps.push(_this.update_one(key,img))
                })
              }
              Promise.all(ps).then(res=>{
                let params = Object.assign({},_this.product)
                console.log('======upladBack',res)
                res.forEach(it=>{
                  params[it.key] = it.path
                })
                resolve(params)
              },rej=>{
                reject(1)
              })
            })
          },
          toSave(){
            let _this = this;
            this.upload_all().then(params=>{
              params.shop_id = _this.shopId
              if (_this.id>-1)
              {
                params.com_id = _this.id
                marketService.edit_product(params).then(res=>{
                  if (res.code==0)
                  {
                    _this.$toast.success("编辑商品成功")
                    // return;
                    setTimeout(()=>{
                      this.$router.replace('/product')
                    },1200)
                  }
                  else
                    _this.$toast.fail("操作超时")
                });
                return;
              }
              marketService.add_product(params).then(res=>{
                if (res.code==0)
                {
                  _this.$toast.success("添加成功")
                  // return;
                  setTimeout(()=>{
                    this.$router.replace('/product')
                  },1200)
                }
                else
                  _this.$toast.fail("操作超时")
              });
            })
          },
          formatter(type, value) {
            if (type === 'year') {
              return `${value}年`;
            } else if (type === 'month') {
              return `${value}月`
            }
            return value;
          },
          onConfirm(value) {
            this.product.StartTime = dateFormat(value,"yyyy-MM-dd hh:mm:ss");
            this.showStart = false;
          },
          onConfirm2(value) {
            this.product.EndTime = dateFormat(value,"yyyy-MM-dd hh:mm:ss");
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
