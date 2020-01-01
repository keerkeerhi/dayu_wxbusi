import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 首页
const Home = r => require.ensure([], () => r(require('../components/home/Home')), 'Home')
// 登录
const Begin = r => require.ensure([], () => r(require('../components/begin/Begin')), 'Begin')
// 入驻
const Register = r => require.ensure([], () => r(require('../components/register/Register')), 'Register')
// 顾客
const Customer = r => require.ensure([], () => r(require('../components/customer/Customer')), 'Customer')
// 产品
const Product = r => require.ensure([], () => r(require('../components/product/Product')), 'Product')
// 编辑产品
const Edit = r => require.ensure([], () => r(require('../components/edit/Edit')), 'Edit')
// 审核状态
const ShopStatus = r => require.ensure([], () => r(require('../components/shopstatus/ShopStatus')), 'ShopStatus')
// 我的订单
const Order = r => require.ensure([], () => r(require('../components/order/Order')), 'Order')

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Begin',
      name: 'Begin',
      component: Begin
    },
    {
      path: '/customer',
      name: 'Customer',
      component: Customer
    },
    {
      path: '/product',
      name: 'Product',
      component: Product
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/shopstatus',
      name: 'ShopStatus',
      component: ShopStatus
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    }
  ]
})
