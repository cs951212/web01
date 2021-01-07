import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import Users from '../views/user/Users.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/home',
    component: Home,
    redirect:'/welcome',
    children:[
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path:'/users',
        component:Users
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
]

const router = new VueRouter({
  routes
})

export default router
