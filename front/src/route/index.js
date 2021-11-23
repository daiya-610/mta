import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Task from '../components/Task.vue'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/tasks',
    component: Task,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
