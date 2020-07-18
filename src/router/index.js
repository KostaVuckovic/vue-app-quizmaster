import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import Categories from '../views/Categories.vue'
import Playground from '../views/Playground.vue'
import PlaygroundTwo from '../views/PlaygroundTwo.vue'
import Finish from '../views/Finish.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
    meta: { requiresAuth: true }
  },
  {
    path: '/playground',
    name: 'Playground',
    component: Playground,
    meta: { requiresAuth: true }
  },
  {
    path: '/playgroundtwo',
    name: 'PlaygroundTwo',
    component: PlaygroundTwo,
    meta: { requiresAuth: true }
  },
  {
    path: '/finish',
    name: 'Finish',
    component: Finish,
    meta: { requiresAuth: true }
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('user_data');

  if( to.matched.some( record => record.meta.requiresAuth ) && !isLoggedIn ){
    next('/login')
  }
  next()
})

export default router
