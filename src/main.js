import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import VueStash from 'vue-stash';

Vue.config.productionTip = false

new Vue({
  
  router,
  render: h => h(App),
}).$mount('#app')

Vue.use(VueStash)
