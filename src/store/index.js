import Vue from 'vue'
import Vuex from 'vuex'
// 光引用不成，还得使用
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    shopId: '',
    jsLoaded: false
  },
  mutations: {
    setShop(state, sId) {
      state.shopId = sId
    },
    setJs(state, status)
    {
      state.jsLoaded = status;
    }
  },
  getters:{
    getJs: state => {
      return state.jsLoaded;
    }
  }
})

export default store
