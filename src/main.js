// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import './utils'
import './utils'
// Vue.use(MintUI)
import axios from 'axios';
//部分引入mint-ui,这次引入 progress和Actionsheet



//全局注册组件，进度条以及加减按钮
// import './components/com/index.js'

import components from './components/com/index'

Vue.use(components);

/*引入全局过滤器*/
Vue.filter('clipPic', function (url) {

  if(url&&url.indexOf('wangsu-image.rings.tv')!==-1){
    return url+'?w=80'
  }else {
    return url;
  }
  // 返回处理后的值
})
/*部分引入*/

import VueLoading from './plugs/load/index'
Vue.use(VueLoading);


/*拦截请求和相应*/
axios.interceptors.request.use(config => {
  // element ui Loading方法
  console.log('拦截请求');

  Vue.prototype.$loading();

  return config
}, error => {

  return Promise.reject(error)
});
/**/
axios.interceptors.response.use(data => {
  // element ui Loading方法
  console.log('拦截响应');
  Vue.prototype.$loading.end();
  return data
}, error => {
  // Indicator.close();
  // Vue.prototype.$loading.close();
  Vue.prototype.$loading.end();
  return Promise.reject(error)
});

Vue.use(router)
/*申明一个独立的空vue实例*/
Vue.prototype.Event=new Vue();

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
