<script setup lang="ts">
import { NFlex, NSwitch, NIcon, darkTheme } from 'naive-ui';
import { inject, ref } from 'vue';
import { useRouter, type Router } from 'vue-router';
import IconUserAvatarLight from '../icons/IconUserAvatarLight.vue';
import type { Theme } from '@/types/App';
import type { Drawer } from '@/types/components/Home';
import IconArrowBack from '../icons/IconArrowBack.vue';

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

// 路由
const router: Router = useRouter();

// 导入主题设置
const { theme, handleSetTheme } = inject('theme') as Theme;
const themeSwitch = ref(typeof theme.value !== 'undefined');

// 导入侧边抽屉设置
let activateDrawer: (() => void) | undefined = undefined;
if (props.hasDrawer) {
    activateDrawer = (inject('drawer') as Drawer).activateDrawer;
}

/*
    返回HomeView
*/
const backHome = () => {
    router.push('/');
};
</script>

<template>
    <n-flex 
        justify="space-between" 
        align="center"
    >
        <n-icon v-if="props.hasDrawer" :size="30" @click="activateDrawer">
            <IconUserAvatarLight />
        </n-icon>
        <n-icon v-else :size="30" @click="backHome">
            <IconArrowBack />
        </n-icon>
        <span style="font-size: 2rem;">{{ props.title }}</span>
        <n-switch
            v-model:value="themeSwitch"
            @update:value="handleSetTheme"
        >
        </n-switch>
    </n-flex>
</template>

<style scoped>
</style>