<script setup lang="ts">
import { darkTheme, NConfigProvider } from 'naive-ui';
import { ref, provide } from 'vue';
import type { Theme } from './types/App';
import type { Ref } from 'vue';
import type { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface';
// 设置主题
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
// 向子组件传递接口
provide('theme', {
  theme,
  handleSetTheme
} as Theme);
</script>

<template>
  <n-config-provider 
    :theme="theme"
  >
    <router-view v-slot="{ Component, route }">
      <transition :name="(route.meta.transition as string)">
        <keep-alive>
          <component :is="Component" :key="route.path"/>
        </keep-alive>
      </transition>
    </router-view>
  </n-config-provider>
</template>

<style scoped>
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
    opacity 0.3s cubic-bezier(0.58, 0.09, 0.30, 0.98);
  transition-delay: 0.25s;
}

.slide-down-leave-active {
  opacity: 0.9;
  transition: 
    transform 0.5s cubic-bezier(0.44, 0.12, 0.21, 0.94),
    opacity 0.5s cubic-bezier(0.18, 1.17, 0.18, 0.93);
  transition-delay: 0s, 0s;
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
