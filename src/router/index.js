import { createRouter, createWebHistory } from 'vue-router'
import Quiz from '../components/Quiz.vue'
import Main from '../components/Main.vue'
import ChooseSubject from '../components/ChooseSubject.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/quiz/:category/:name',
      name: 'quiz',
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
