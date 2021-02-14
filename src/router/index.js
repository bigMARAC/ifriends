import Explore from '../views/explore/Explore.vue'
import Login from '../views/login/Login.vue'
import Profile from '../views/profile/Profile.vue'
import Signup from '../views/register/Signup.vue'
import Match from '../views/match/Match.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/match',
    name: 'Match',
    component: Match
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.name === 'Login' && localStorage.getItem('user') !== null) {
    await store.dispatch('restoreUser')
    next('/explore')
  } else if ((to.fullPath !== '/' && to.fullPath !== '/register') && store.state.user.token === undefined) {
    next('/')
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    next()
  }
})

export default router
