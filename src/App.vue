<script setup lang="ts">
import { darkTheme, NConfigProvider, NIcon } from 'naive-ui';
import { ref, provide, computed, nextTick } from 'vue';
import IconUserAvatarLight from './components/icons/IconUserAvatarLight.vue';
import type { AvatarLoc, Theme } from './types/App';
import type { Ref } from 'vue';
import type { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface';

// 设置主题s
const theme: Ref<BuiltInGlobalTheme | undefined> = ref(undefined);

  /*
  设置主题
  参数：value: boolean
  返回值：void
*/
const handleSetTheme = (value: boolean): void => {
    if (value) {
      theme.value = darkTheme;
    }
    else {
      theme.value = undefined;
    }
};

/*
  确认头像位置
  参数：void
  返回值：void
*/
const isActive: Ref<boolean> = ref(false);
const avatarX: Ref<number> = ref(0);
const avatarY: Ref<number> = ref(0);
const getAvatarLoc = (): void => {
  const avatar: HTMLElement | null = document.getElementById('loginAvatar');
  if (avatar) {
    avatarX.value = avatar.getBoundingClientRect().left;
    avatarY.value = avatar.getBoundingClientRect().top;
    console.log(`left: ${avatarX.value}, top: ${avatarY.value}`);
  }
};

// 计算克隆头像style对象
const activeStyle = computed(() => {
  return {
    left: `${avatarX.value}px`,
    top: `${avatarY.value}px`,
    opacity: isActive.value ? 1 : 0,
    transform: isActive.value ? `translate(${-avatarX.value - 35}px, ${-avatarY.value - 25}px) scale(0.25)` : '',
    transition: 'all 0.4s ease'
  };
});

// 向子组件传递主题接口
provide('theme', {
  theme,
  handleSetTheme
} as Theme);

// 向子组件传递头像接口
provide('avatar', {
  avatarX,
  avatarY,
  getAvatarLoc,
  isActive
} as AvatarLoc);
</script>

<template>
  <!-- 克隆头像 -->
  <n-icon 
      :size="120"
      class="avatar-style"
      :style="[activeStyle]"
  >
      <IconUserAvatarLight />
  </n-icon>
  <!-- 主路由 -->
  <n-config-provider 
    :theme="theme">
    <router-view v-slot="{ Component, route }">
      <transition :duration="2500" :name="(route.meta.transition as string)">
        <keep-alive>
          <component :is="Component" :key="route.path"/>
        </keep-alive>
      </transition>
    </router-view>
  </n-config-provider>
</template>

<style scoped>
/*移动头像*/
.avatar-style {
  position: absolute; 
  opacity: 0;
}

/*向上滑动*/
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s cubic-bezier(0.2536, 1, 0.47, 1);
}


.slide-up-enter-from {
  position: absolute;
  transform: translateY(100%);
}


.slide-up-leave-to {
  position: absolute;
  transform: translateY(-100%);
}

/*向下滑动*/
.slide-down-enter-active {
  transition: 
    opacity 0.4s cubic-bezier(0.58, 0.09, 0.30, 0.98);
  transition-delay: 0.3s;
}

.slide-down-leave-active {
  transition: 
    transform 0.5s cubic-bezier(0.44, 0.12, 0.21, 0.94),
    opacity 0.5s cubic-bezier(0.18, 1.17, 0.18, 0.93);
}


.slide-down-enter-from {
  position: absolute;
  opacity: 0;
}


.slide-down-leave-to {
  position: absolute;
  opacity: 0;
  transform: translateY(100%);
}

/*向左滑动*/
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s cubic-bezier(0.2536, 1, 0.47, 1);
}


.slide-left-enter-from {
  position: absolute;
  transform: translateX(100%);
}


.slide-left-leave-to {
  position: absolute;
  transform: translateX(-100%);
}

/*向右滑动*/
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.2536, 1, 0.47, 1);
}

.slide-right-enter-from {
  position: absolute;
  transform: translateX(-100%);
}


.slide-right-leave-to {
  position: absolute;
  transform: translateX(100%);
}
</style>
