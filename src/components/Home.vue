<script setup lang="ts">
import { NFlex, NLayout, NLayoutHeader, NScrollbar, NDrawer, NDrawerContent, NIcon } from 'naive-ui';
import { ref, provide } from 'vue';
import TopBar from './utils/TopBar.vue';
import type { Ref } from 'vue';
import type { Drawer, LoginDrawer } from '@/types/components/Home';
import DrawerContent from './utils/DrawerContent.vue';
import DrawerLogin from './utils/DrawerLogin.vue';
import WorkBar from './utils/WorkBar.vue';
import IconLoading from './icons/IconLoading.vue';

// 获取屏幕数据
const screenWidth: Ref<number> = ref(window.innerWidth * 0.618);
const screenHeight: Ref<number> = ref(window.innerHeight * 0.96);

// 侧边抽屉
const active: Ref<boolean> = ref(false);
/*
    激活侧边抽屉
*/
const activateDrawer = () => {
    // 重新计算屏幕宽度
    screenWidth.value = window.innerWidth * 0.618;
    active.value = true;
};
provide('drawer', {
    active,
    activateDrawer
} as Drawer);

// 下边抽屉
const activeBottomDrawer: Ref<boolean> = ref(false);
/*
    激活下边抽屉
*/
const activateBottomDrawer = () => {
    screenHeight.value = window.innerHeight * 0.96;
    active.value = false;
    activeBottomDrawer.value = true;
}
provide('loginDrawer', {
    activeBottomDrawer,
    activateBottomDrawer
} as LoginDrawer);

// 更新任务栏
const updateWorkBar = ref(0);
provide('updateWorkBar', updateWorkBar);
</script>

<template>
    <div class="wrapper">
        <n-layout 
            position="absolute"
            class="section"
            :class="{ open: activeBottomDrawer }"
        >
            <n-layout-header
                style="height: 70px; padding: 10px;"
                bordered
            >
                <TopBar title="内务主页" :has-drawer="true"/>
            </n-layout-header>
            <n-layout
                position="absolute"
                style="padding: 20px; top: 70px;"
                has-sider
            >
                <n-scrollbar>
                    <n-flex
                        style="padding: 10px;"
                        :size=30
                        justify="center"
                    >
                        <Suspense timeout="500">
                            <template #default>
                                <WorkBar :key="updateWorkBar"/>
                            </template>
                            <template #fallback>
                                <n-icon :size="60" style="top: 250px;">
                                    <IconLoading />
                                </n-icon>
                            </template>
                        </Suspense>
                    </n-flex>
                </n-scrollbar>
            </n-layout>
        </n-layout>
        <!-- 侧边抽屉 -->
        <n-drawer 
            v-model:show="active"
            :width="screenWidth"
            placement="left"
            :trap-focus="false"
        >
            <n-drawer-content 
                title="您好"
                closable
            >
                <DrawerContent />
            </n-drawer-content>
        </n-drawer>
        <!-- 下边抽屉 -->
        <n-drawer
            v-model:show="activeBottomDrawer"
            :height="screenHeight"
            placement="bottom"
            :trap-focus="false"
            style="border-top-left-radius: 1.5em 2em; border-top-right-radius: 1.5em 2em;"
        >
            <n-drawer-content
                header-style="border-bottom: 0;"
            >
                <template #header>
                    <n-flex justify="center">
                        <h2 style="margin: 0;">登录</h2>
                    </n-flex>
                </template>
                <DrawerLogin />
            </n-drawer-content>
        </n-drawer>
    </div>
</template>

<style scoped>
.wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* 实验 */
    background-color: black
}

.section {
    transition: all 600ms cubic-bezier(0.2536, 1, 0.47, 1);
}

.open {
    border-top-left-radius: 1.5em 2em; 
    border-top-right-radius: 1.5em 2em;
    transform: scale(0.95);
}
</style>