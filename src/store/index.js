import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    
  },
  mutations: {
    LOGOUT(state, payload){
      state.scr1 = null
      axios.post('http://051b122.mars-e1.mars-hosting.com/quiz/auth/logout', {sid: payload})
      .then(() => {
        localStorage.clear()
        this.$router.push({name: 'Login'})
      })
      
    }
  },
  actions: {
    logout({ commit }){
      commit('LOGOUT')
    }
  }
  
})

export default store