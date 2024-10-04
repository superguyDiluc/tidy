import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import type { Ref } from 'vue'
import type { AvatarLoc } from './types/App'

const app = createApp(App)
const isLogining: Ref<boolean> = ref(false);
const isActive: Ref<boolean> = ref(false);
const avatarX: Ref<number> = ref(0);
const avatarY: Ref<number> = ref(0);
/*
  确认头像位置
  参数：void
  返回值：void
*/
const getAvatarLoc = (): void => {
  const avatar: HTMLElement | null = document.getElementById('loginAvatar');
  if (avatar) {
    avatarX.value = avatar.getBoundingClientRect().left;
    avatarY.value = avatar.getBoundingClientRect().top;
    // console.log(`left: ${avatarX.value}, top: ${avatarY.value}`);
  }
};
// 向子组件传递头像接口
app.provide('avatar', {
    avatarX,
    avatarY,
    getAvatarLoc,
    isActive,
    isLogining
} as AvatarLoc);

app.use(router)

app.mount('#app')