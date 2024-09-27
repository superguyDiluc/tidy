<script setup lang="ts">
import { NLayout, NLayoutHeader } from 'naive-ui';
import TopBar from './utils/TopBar.vue';
</script>

<template>
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
        </n-layout>
    </n-layout>
</template>

<style scoped>
</style>