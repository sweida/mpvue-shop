import Vue from 'vue'
import App from './App'

import fly from "./utils/request";
import store from "./store"

import '../static/colorui/animation.wxss'
import '../static/colorui/main.wxss'
import '../static/colorui/icon.wxss'
import './style/main.css'

Vue.config.productionTip = false
Vue.prototype.$fly = fly;
Vue.prototype.$store = store

App.mpType = 'app'


const app = new Vue(App)
app.$mount()
