import Vue from 'vue'
import Vuex from 'vuex'
// 光引用不成，还得使用
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    shopId: '',
    shopPos: {
      lat: '',
      lon: ''
    },
    jsLoaded: false
  },
  mutations: {
    setShop(state, sId) {
      state.shopId = sId
    },
    setPos(state,pos)
    {
      state.shopPos = pos;
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
