import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate";

import actions from "./actions.js";
import getters from "./getters.js";
// import mutations from './mutations.js'

Vue.use(Vuex)

const state = {
  isLogin: false,
  userInfo: {
    nickName: "",
    avatarUrl: ""
  },
  loginData: {},
  cart: 0,
  cartList: [
    {
      goodname: "这是标题啊啊啊啊啊啊1",
      check: false,
      amount: 1,
      unitPrice: 88.9,
      img: "ss"
    },
    {
      goodname: "这是标题啊啊啊啊啊啊2",
      check: true,
      amount: 6,
      unitPrice: 88.7,
      img: "ss"
    },
    {
      goodname: "这是标题啊啊啊啊啊啊3",
      check: true,
      amount: 2,
      unitPrice: 88.0,
      img: "ss"
    }
  ]
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations: {
    update(state, config) {
      Object.keys(config).map((item, key) => {
        state[item] = config[item]
      })
    }
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) => wx.setStorageSync(key, value),
        removeItem: key => wx.removeStorageSync(key)
      }
    })
  ]
});