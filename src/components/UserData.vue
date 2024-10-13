<script setup lang="ts">
import { NLayout, NLayoutHeader, NScrollbar, NFlex } from 'naive-ui';
import TopBar from './utils/TopBar.vue';
import CommonCard from './utils/CommonCard.vue';

// 可用服务
const serviceOptions = [
    {
        tag: '修改用户名',
        event: undefined
    },
    {
        tag: '修改头像',
        event: undefined
    },
    {
        tag: '修改密码',
        event: undefined
    }
];
</script>

<template>
    <div class="wrapper">
        <n-layout position="absolute">
            <n-layout-header
                style="height: 70px; padding: 10px;"
                bordered
            >
                <TopBar title="个人信息"/>
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
                        <CommonCard v-for="option in serviceOptions" :key="option.tag" :tag="option.tag" @click="option.event"/>
                    </n-flex>
                </n-scrollbar>
            </n-layout>
        </n-layout>
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