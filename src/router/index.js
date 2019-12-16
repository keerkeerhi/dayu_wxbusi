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

export default new Router({
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
    }
  ]
})
