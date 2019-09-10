import Vue from 'vue'
import App from './App'

import '../static/colorui/animation.wxss'
import '../static/colorui/main.wxss'
import '../static/colorui/icon.wxss'
import './style/main.css'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
