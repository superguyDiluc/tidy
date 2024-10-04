import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { inject } from 'vue';
import type { AvatarLoc } from '@/types/App';

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
      },
      // 时刻监听克隆头像变化
      beforeEnter: (to, from, next) => {
        const {
          avatarX,
          avatarY,
          getAvatarLoc,
          isActive,
          isLogining
        } = inject('avatar') as AvatarLoc;
        isLogining.value = true;
        const intervalId = setInterval(() => {
          getAvatarLoc();
        }, 500);

        to.meta.intervalId = intervalId;
        next();
      }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView.vue'),
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

router.beforeEach((to, from, next) => {
  // 在全局路由守卫中处理路由离开时停止循环
  if (from.meta.intervalId) {
    const {
      avatarX,
      avatarY,
      getAvatarLoc,
      isActive,
      isLogining
    } = inject('avatar') as AvatarLoc;
    setTimeout(() => isLogining.value = false, 800);
    clearInterval(from.meta.intervalId as number);
  }
  next();
});

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
