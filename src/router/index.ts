import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/userdata',
      name: 'userdata',
      component: () => import('../views/UserDataView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        requiresAuth: false
      }
    }
  ]
})

// router.beforeEach((to, from) => {
//   if (to.meta.requiresAuth) {
//     return {
//       path: '/login',
//       query: { redirect: to.fullPath },
//     }
//   }
// })

router.afterEach((to, from) => {
  /*
    目的：实现动效仅在navigation作用
    功能：检测from的路由记录，若有则是navigation，若无则是reload
  */
  if (from.matched[0]) {
    const toDepth = to.path === '/' ? 0 : to.path.split('/').length;
    const fromDepth = from.path === '/' ? 0 : from.path.split('/').length;
    if (toDepth < fromDepth) {
      to.meta.transition = from.path === '/login' ? 'slide-down' : 'slide-right';
    }
    else if (toDepth > fromDepth) {
      to.meta.transition = to.path === '/login' ? 'slide-up' : 'slide-left';
    }
  }
})

export default router
