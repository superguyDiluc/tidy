<script setup lang="ts">
import { NFlex, NLayout, NLayoutHeader, NScrollbar, NDrawer, NDrawerContent } from 'naive-ui';
import { ref, provide } from 'vue';
import TopBar from './utils/TopBar.vue';
import WorkCard from './utils/WorkCard.vue';
import type { Ref } from 'vue';
import type { Drawer } from '@/types/components/Home';
import DrawerContent from './utils/DrawerContent.vue';

// 获取屏幕宽度
const screenWidth: Ref<number> = ref(window.innerWidth * 0.618);

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
</script>

<template>
    <div class="wrapper">
        <n-layout position="absolute">
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
                    >
                        <WorkCard />
                        <WorkCard />
                        <WorkCard />
                        <WorkCard />
                        <WorkCard />
                    </n-flex>
                </n-scrollbar>
            </n-layout>
        </n-layout>
        <n-drawer 
            v-model:show="active"
            :width="screenWidth"
            placement="left"
            :trap-focus="false"
        >
            <n-drawer-content 
                title="Diluc, 您好"
                closable
            >
                <DrawerContent />
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
}
</style>