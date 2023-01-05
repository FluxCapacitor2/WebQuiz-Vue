import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Quiz from '../components/Quiz.vue'
import Main from '../components/Main.vue'
import ChooseSubject from '../components/ChooseSubject.vue'

const router = createRouter({
  history: process.env.NODE_ENV === 'production' ? createWebHashHistory(import.meta.env.BASE_URL) : createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/quiz/:name',
      name: 'quiz-by-encoded-id',
      component: Quiz
    },
    {
      path: '/quiz/i/:index',
      name: 'quiz-by-index',
      component: Quiz
    },
    {
      path: '/:category',
      component: Main
    },
    {
      path: '/',
      component: ChooseSubject
    }
  ]
})

export default router
