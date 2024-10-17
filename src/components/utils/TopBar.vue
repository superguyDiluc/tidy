<script setup lang="ts">
import { NFlex, NSwitch, NIcon, useMessage } from 'naive-ui';
import { inject, ref, watch } from 'vue';
import { useRouter, type Router } from 'vue-router';
import IconUserAvatarLight from '../icons/IconUserAvatarLight.vue';
import type { Theme } from '@/types/App';
import type { Drawer, LoginDrawer } from '@/types/components/Home';
import IconArrowBack from '../icons/IconArrowBack.vue';
import { checkLogin } from '@/utils';

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

// 广播
const message = useMessage();

// 路由
const router: Router = useRouter();

// 导入主题设置
const { theme, handleSetTheme } = inject('theme') as Theme;
const themeSwitch = ref(theme.value !== undefined);
watch(theme, () => {
    themeSwitch.value = theme.value !== undefined;
});

// 导入侧边抽屉设置
let activateDrawer: (() => void) | undefined = undefined;
if (props.hasDrawer) {
    activateDrawer = (inject('drawer') as Drawer).activateDrawer;
}

// 获取登录界面接口
let activateBottomDrawer: (() => void) | undefined = undefined;
if (props.hasDrawer) {
    activateBottomDrawer = (inject('loginDrawer') as LoginDrawer).activateBottomDrawer;
}

/*
    路由回退
*/
const backHome = () => {
    router.push('/tidy');
};

/*
    抽屉事件处理
*/
const handleSideDrawer = () => {
    const loginStatus = checkLogin();
    if (loginStatus && activateDrawer) {
        activateDrawer();
    }
    else if (activateBottomDrawer) {
        message.info('Please Login First');
        activateBottomDrawer();
    }
};
</script>

<template>
    <n-flex 
        justify="space-between" 
        align="center"
    >
        <n-icon v-if="props.hasDrawer" :size="30" @click="handleSideDrawer">
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