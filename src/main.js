import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false



new Vue({
  router,
  store,
  created(){
    axios.interceptors.response.use(
      response => response,
      error => {
        if(error.response.status === 403){
          // this.$store.dispatch('logout')
          this.$router.push({name: 'Login'})
        }
        return Promise.reject(error)
      }
    )
    
  },
  render: h => h(App)
}).$mount('#app')
