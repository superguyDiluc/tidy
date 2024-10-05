<script setup lang="ts">
import { darkTheme, NConfigProvider, NMessageProvider } from 'naive-ui';
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
    <n-message-provider>
      <router-view v-slot="{ Component, route }">
        <transition :name="(route.meta.transition as string)">
          <keep-alive>
            <component :is="Component" :key="route.path"/>
          </keep-alive>
        </transition>
      </router-view>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
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
