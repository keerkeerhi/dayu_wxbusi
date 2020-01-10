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
    ShopIndustry:'',
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
    setInd(state,ind)
    {
      state.ShopIndustry = ind;
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
