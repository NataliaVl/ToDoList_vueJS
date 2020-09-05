import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import VueComp from '@vue/composition-api';
Vue.config.productionTip = false;
import lodash from 'lodash';    
Object.defineProperty(Vue.prototype, '$lodash', { value: lodash });
window._ = require('lodash');

Vue.use(VueComp);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
