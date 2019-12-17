// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './assets/css/element-variables.scss'

import store from './store'
// import "babel-polyfill"

Vue.config.productionTip = false
Vue.use(ElementUI)

import { Field,CellGroup,Toast,Popup,Picker,Uploader,Tabbar,TabbarItem,Collapse,CollapseItem } from 'vant';
Vue.use(Field);
Vue.use(CellGroup);
Vue.use(Toast);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Uploader);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
// import {
//   Actionsheet,
//   AddressEdit,
//   AddressList,
//   Area,
//   Badge,
//   BadgeGroup,
//   Button,
//   Card,
//   Cell,
//   CellGroup,
//   Checkbox,
//   CheckboxGroup,
//   Circle,
//   Col,
//   Collapse,
//   CollapseItem,
//   ContactCard,
//   ContactEdit,
//   ContactList,
//   Coupon,
//   CouponCell,
//   CouponList,
//   DatetimePicker,
//   Dialog,
//   Field,
//   GoodsAction,
//   GoodsActionBigBtn,
//   GoodsActionMiniBtn,
//   Icon,
//   ImagePreview,
//   Info,
//   Lazyload,
//   List,
//   Loading,
//   Locale,
//   NavBar,
//   NoticeBar,
//   Notify,
//   NumberKeyboard,
//   Overlay,
//   Pagination,
//   Panel,
//   PasswordInput,
//   Picker,
//   Popup,
//   Progress,
//   PullRefresh,
//   Radio,
//   RadioGroup,
//   Rate,
//   Row,
//   Search,
//   Sku,
//   Slider,
//   Step,
//   Stepper,
//   Steps,
//   SubmitBar,
//   Swipe,
//   SwipeCell,
//   SwipeItem,
//   Switch,
//   SwitchCell,
//   Tab,
//   Tabbar,
//   TabbarItem,
//   Tabs,
//   Tag,
//   Toast,
//   TreeSelect,
//   Uploader
// } from 'vant'
// import 'vant/lib/index.css'
//
// Vue.use(Actionsheet)
//   .use(AddressEdit)
//   .use(AddressList)
//   .use(Area)
//   .use(Badge)
//   .use(BadgeGroup)
//   .use(Button)
//   .use(Card)
//   .use(Cell)
//   .use(CellGroup)
//   .use(Checkbox)
//   .use(CheckboxGroup)
//   .use(Circle)
//   .use(Col)
//   .use(Collapse)
//   .use(CollapseItem)
//   .use(ContactCard)
//   .use(ContactEdit)
//   .use(ContactList)
//   .use(Coupon)
//   .use(CouponCell)
//   .use(CouponList)
//   .use(DatetimePicker)
//   .use(Dialog)
//   .use(Field)
//   .use(GoodsAction)
//   .use(GoodsActionBigBtn)
//   .use(GoodsActionMiniBtn)
//   .use(Icon)
//   .use(ImagePreview)
//   .use(Info)
//   .use(Lazyload)
//   .use(List)
//   .use(Loading)
//   .use(Locale)
//   .use(NavBar)
//   .use(NoticeBar)
//   .use(Notify)
//   .use(NumberKeyboard)
//   .use(Overlay)
//   .use(Pagination)
//   .use(Panel)
//   .use(PasswordInput)
//   .use(Picker)
//   .use(Popup)
//   .use(Progress)
//   .use(PullRefresh)
//   .use(Radio)
//   .use(RadioGroup)
//   .use(Rate)
//   .use(Row)
//   .use(Search)
//   .use(Sku)
//   .use(Slider)
//   .use(Step)
//   .use(Stepper)
//   .use(Steps)
//   .use(SubmitBar)
//   .use(Swipe)
//   .use(SwipeCell)
//   .use(SwipeItem)
//   .use(Switch)
//   .use(SwitchCell)
//   .use(Tab)
//   .use(Tabbar)
//   .use(TabbarItem)
//   .use(Tabs)
//   .use(Tag)
//   .use(Toast)
//   .use(TreeSelect)
//   .use(Uploader)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
