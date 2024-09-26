<script setup lang="ts">
import { darkTheme, NConfigProvider } from 'naive-ui';
import { ref, provide } from 'vue';
import type { Theme } from './types/components/App';
import type { Ref } from 'vue';
import type { GlobalTheme } from 'naive-ui';
// 设置主题
const theme: Ref<GlobalTheme | null> = ref(null);
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
        theme.value = null;
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
    style="height: 100%;"
  >
    <RouterView />
  </n-config-provider>
</template>

<style scoped>
</style>
