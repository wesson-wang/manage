// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import qs from "qs"
//引入element UI框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入重置样式
import "./assets/css/reset.css"
Vue.config.productionTip = false

 import "./assets/js/spec.js"


//引入过滤器
import Filter from "./filter/index"
for(var i in Filter){
  Vue.filter(i,Filter[i])
}

Vue.prototype.Event=new Vue()
Vue.prototype.$http=axios
Vue.prototype.$qs=qs



Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
