<script setup lang="ts">
import { NFlex, NSwitch, NIcon } from 'naive-ui';
import { inject } from 'vue';
import IconUserAvatarLight from '../icons/IconUserAvatarLight.vue';
import type { Theme } from '@/types/App';
import type { Drawer } from '@/types/components/Home';

// 传入属性
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    hasDrawer: {
        type: Boolean,
        default: false
    }
});

// 导入主题设置
const { theme, handleSetTheme } = inject('theme') as Theme;
// 导入侧边抽屉设置
let activateDrawer: (() => void) | undefined = undefined;
if (props.hasDrawer) {
    activateDrawer = (inject('drawer') as Drawer).activateDrawer;
}
</script>

<template>
    <n-flex 
        justify="space-between" 
        align="center"
    >
        <n-icon v-if="props.hasDrawer" :size="30" @click="activateDrawer">
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