<script setup lang="ts">
import { NFlex, NSwitch, NIcon } from 'naive-ui';
import { inject } from 'vue';
import IconUserAvatarLight from '../icons/IconUserAvatarLight.vue';
import type { Theme } from '@/types/components/App';

// 传入属性
const props = defineProps({
    title: {
        type: String,
        required: true
    }
});

// 导入主题设置
const { theme, handleSetTheme } = inject('theme') as Theme;
</script>

<template>
    <n-flex 
        justify="space-between" 
        align="center"
    >
        <n-icon size="30">
            <IconUserAvatarLight />
        </n-icon>
        <span style="font-size: 2rem;">{{ props.title }}</span>
        <n-switch
            @update:value="handleSetTheme"
        >
        </n-switch>
    </n-flex>
</template>

<style scoped>
</style>