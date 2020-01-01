import {baseURL} from '../components/common/globaldata'
import axios from 'axios'
import {getParams} from '../components/common/Util'
axios.interceptors.response.use(function (response) {
  // 在接收响应做些什么，例如跳转到登录页
  return response;
}, function (error) {
  if (error.response) {
    console.log('===status',error.response.status)
    switch (error.response.status) {
      // 返回401，清除token信息并跳转到登录页面
      case 302:
        location.href='https://shop.dayu1.net/api/normal_user_info/';break;
    }
  }
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 查询市场列表 用来查询市场中的菠萝列表，包括类型、筛选、排序、分页等，目前仅支持类型中的所有，其余暂不支持。
const shop_status = baseURL + 'shop-status/'
// 入驻商铺
const shop_msg = baseURL + 'shop-msg/'
// 获取微信api信息
const get_wxcfg = baseURL + 'get-wxcfg/'
// 上传图片
const uploads = baseURL + 'uploads/'
// 查询店铺信息
const my_shop = baseURL + 'my-shop/'
// 查询顾客信息
const my_customer = baseURL + 'my-customers/'
// 查询产品
const my_product = baseURL + 'pm/'
// 添加商品
const add_product = baseURL + 'add-commodity/'

export default {
  add_product(params){
    return new Promise((resolve, reject) => {
      axios.post(add_product,params).then(res => {
        resolve(res.data)
      })
    })
  },
  my_product(params) {
    return new Promise((resolve, reject) => {
      axios.get(my_product + getParams(params)).then(res => {
        resolve(res.data)
      })
    })
  },
  my_customer(params) {
    return new Promise((resolve, reject) => {
      axios.get(my_customer + getParams(params)).then(res => {
        resolve(res.data)
      })
    })
  },
  my_shop() {
    return new Promise((resolve, reject) => {
      axios.get(my_shop).then(res => {
        resolve(res.data)
      })
    })
  },
  get_wxcfg(params) {
    return new Promise((resolve, reject) => {
      axios.get(get_wxcfg + getParams(params)).then(res => {
        resolve(res.data)
      })
    })
  },
  upload_img(url,params){
    return new Promise((resolve, reject) => {
      axios.post(baseURL + url +'/',params).then(res => {
        resolve(res.data)
      })
    })
  },
  uploads(params){
    return new Promise((resolve, reject) => {
      axios.post(uploads,params).then(res => {
        resolve(res.data)
      })
    })
  },
  shopStatus(params) {
    return new Promise((resolve, reject) => {
      axios.get(shop_status + getParams(params)).then(res => {
        resolve(res.data)
      })
    })
  },
  shop_msg(params) {
    return new Promise((resolve, reject) => {
      axios.post(shop_msg, params).then(res => {
        resolve(res.data)
      })
    })
  }
}
