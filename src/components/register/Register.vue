<template>
    <section class="registPage" >
      <van-cell-group class="item-div" >
        <van-field v-model="data.ShopName" placeholder="请输入店铺名称" />
      </van-cell-group>
      <van-cell-group class="item-div" >
        <van-field v-model="data.ShopLocation" @click-right-icon="getLoc" placeholder="请输入店铺位置" >
          <i class="iconfont iconlocation" slot="right-icon" ></i>
        </van-field>
      </van-cell-group>
      <van-cell-group class="item-div" >
        <van-field
          readonly
          clickable
          :value="data.ShopIndustry"
          placeholder="选择行业"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
      </van-cell-group>
      <van-cell-group class="item-div phoneDiv1" >
        <span>营业执照</span>
        <van-uploader v-model="fileList" :max-count="1" :after-read="read_file" />
      </van-cell-group>
      <van-cell-group class="item-div phoneDiv1" >
        <span>身份证正反面</span>
        <van-uploader v-model="positive" :max-count="1" :after-read="read_posi" />
        <van-uploader v-model="reverse_img" :max-count="1" :after-read="read_rev" />
      </van-cell-group>
      <van-cell-group class="item-div" >
        <van-field v-model="data.phone" placeholder="请输入联系电话" />
      </van-cell-group>
      <div class="bottom-btn" >
        <button class="normal-btn" @click="saveInfo" >提交审核</button>
      </div>
      <van-popup
        v-model="showMap"
        position="top"
        :style="{ height: '100%' }"
      >
        <iframe id="mapPage" width="100%" height="100%" frameborder=0
                src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=J7GBZ-KOEWO-YY5W4-SKQVK-ZJRQK-MKFLQ&referer=goldfish">
        </iframe>
      </van-popup>
    </section>
</template>

<script>
  import marketService from '../../service/bolosev'
  import {EventBus} from '../common/EventBus'
    export default {
        name: "Register",
      data(){
          return {
            showMap: false,
            showPicker: false,
            columns: ['百货', '美食', '服饰', '汽车'],
            industryObj: {'百货':1,'美食':2,'服饰':3,'汽车':4},
            data: {
              ShopName: '',
              ShopLocation: '',
              ShopCoordinates: '',
              ShopIndustry: '',
              BusinessLicense: '',
              Positive: '',
              Negative: '',
              phone: ''
            },
            fileList: [],
            positive: [],
            reverse_img: []
          }
      },
      created(){
        document.title = "入驻申请"
        let _this = this;
        EventBus.$on("positionBack",({latlng,poiaddress,cityname,poiname})=>{
          let {lat,lng} = latlng
          _this.showMap = false;
          _this.data.ShopCoordinates = lat + ',' + lng;
          _this.data.ShopLocation = cityname + poiaddress;
        })
      },
      methods: {
        read_file(file){
          // 此时可以自行将文件上传至服务器
          console.log(file);
        },
        read_posi(file) {
          console.log(file);
        },
        read_rev(file) {
          console.log(file);
        },
        getLoc(){
          let _this = this;
          _this.showMM();

        },
        showMM(){
          this.showMap = true;
        },
        onConfirm(value) {
          this.data.ShopIndustry = value;
          this.showPicker = false;
        },
        update_one(key,file){
          return new Promise((ress,rejj)=>{
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
            _this.fileList.forEach(it=>{
              ps.push(_this.update_one('BusinessLicense',it))
            })
            _this.positive.forEach(it=>{
              ps.push(_this.update_one('Positive',it))
            })
            _this.reverse_img.forEach(it=>{
              ps.push(_this.update_one('Negative',it))
            })
            Promise.all(ps).then(res=>{
              let params = Object.assign({},_this.data)
              res.forEach(it=>{
                params[it.key] = it.path
              })
              resolve(params)
            },rej=>{
              reject(1)
            })
          })
        },
        saveInfo(){
          let _this = this;
          this.upload_all().then(params=>{
            params.ShopIndustry = _this.industryObj[params.ShopIndustry];
            console.log('----->shopIn',params.ShopIndustry)
            marketService.shop_msg(params).then(res=>{
              if (res.code==0)
              {
                _this.$router.push('/shopstatus');
              }
              else
              {
                _this.$toast.fail('服务器宕机了，555~');
              }
            })
          },rej=>{
            _this.$toast.fail("上传图片超时")
          })
        }
      }
    }
</script>

<style scoped>
  .registPage{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #F8F8F8;
  }
  .item-div{
    margin-top: 40px;
  }
  .phoneDiv1{
    min-height: 236px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .phoneDiv1>span:first-child{
    font-size: 28px;
    color: rgb(150,151,153);
    margin-right: 20px;
    margin-left: 26px;
  }
  .iconlocation{
    color: #150080;
    font-weight: bold;
    font-size: 45px;
  }
  .normal-btn{
    border-radius: 10px;
    height: 84px;
    width: 325px;
  }
  .bottom-btn{
    margin-top: 5.333vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  #map-cont{
    width: 100vw;
    height: 100vh;
    background: #fff;
  }
</style>
