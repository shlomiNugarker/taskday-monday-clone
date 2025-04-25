import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import loginView from '../views/loginView.vue'
import boardDetails from '../views/boardDetailsView.vue'
import taskDetails from '../views/taskDetailsView.vue'

import boardView from '../views/boardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: loginView,
    },

    {
      path: '/board',
      name: 'boardApp',
      component: boardView,
      children: [
        {
          path: ':boardId',
          component: boardDetails,
          children: [
            {
              path: 'task/:taskId',
              component: taskDetails,
            },
          ],
        },
      ],
    },
  ],
})

export default router
