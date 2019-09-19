import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate";

import actions from "./actions.js";
import getters from "./getters.js";
import mutations from './mutations.js'

Vue.use(Vuex)

const state = {
    userInfo: {a: 'dd'},
    loginData: {}
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) => wx.setStorageSync(key, value),
        removeItem: key => () => {}
        // removeItem: key => wx.clearStorage()
      }
    })
  ]
});