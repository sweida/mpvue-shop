import Vue from 'vue'
import App from './App'

import '../static/colorui/animation.wxss'
import '../static/colorui/main.wxss'
import '../static/colorui/icon.wxss'
import './style/main.css'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.config.proxyTable = "http://127.0.0.1:8080/api/v1";

console.log(this.$proxyTable, 5445);



const app = new Vue(App)
app.$mount()
