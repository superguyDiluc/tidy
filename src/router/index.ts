import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/userdata',
      name: 'userdata',
      component: () => import('../views/UserDataView.vue'),
    }
  ]
})

router.afterEach((to, from) => {
  const toDepth = to.path === '/' ? 0 : to.path.split('/').length;
  const fromDepth = from.path === '/' ? 0 : from.path.split('/').length;
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left';
})

export default router
