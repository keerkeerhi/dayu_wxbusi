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
// 编辑商铺信息
const edit_shop = baseURL + 'edit-shop/'
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
// 商品详情
const pro_detail = baseURL + 'com-details/'
// 编辑商品
const edit_product = baseURL + 'edit-com/'
// 上/下架商品
const take_com = baseURL + 'takeoff-com/'
// 删除商品
const del_com = baseURL + 'delete-com/'
// 标签列表
const type_list = baseURL + 'label-mgt/'
// 创建标签
const create_type = baseURL + 'add-label/'
// 编辑标签
const edit_type = baseURL + 'edit-label/'
// 删除标签
const del_type = baseURL + 'delete-label/'

export default {
  type_list(params) {
    return new Promise((resolve, reject) => {
      axios.get(type_list + getParams(params)).then(res => {
        resolve(res.data)
      })
    })
  },
  del_com(params) {
    return new Promise((resolve, reject) => {
      axios.get(del_com + getParams(params)).then(res => {
        resolve(res.data)
      })
    })
  },
  take_com(params)
  {
    return new Promise((resolve, reject) => {
      axios.post(take_com,params).then(res => {
        resolve(res.data)
      })
    })
  },
  edit_product(params){
    return new Promise((resolve, reject) => {
      axios.post(edit_product,params).then(res => {
        resolve(res.data)
      })
    })
  },
  pro_detail(params){
    return new Promise((resolve, reject) => {
      axios.post(pro_detail,params).then(res => {
        resolve(res.data)
      })
    })
  },
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
  },
  edit_shop(params) {
    return new Promise((resolve, reject) => {
      axios.post(edit_shop, params).then(res => {
        resolve(res.data)
      })
    })
  }
}
