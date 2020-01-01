import Vue from 'vue'
import Vuex from 'vuex'
// 光引用不成，还得使用
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    shopId: ''
  },
  mutations: {
    setShop(state, sId) {
      console.log('---sid',sId)
      state.shopId = sId
    }
  }
})

export default store
