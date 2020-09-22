import Vue from 'vue'
import VueRouter from 'vue-router'
import taskTab from '../views/TaskTab.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'taskTab',
    component: taskTab
  },
  {
    path: '/file',
    name: 'FileSystem',
    component: () => import(/* webpackChunkName: "file" */ '../views/FileSystem.vue')
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
