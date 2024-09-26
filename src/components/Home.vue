<script setup lang="ts">
import { NFlex, NLayout, NLayoutHeader, NScrollbar } from 'naive-ui';
import Header from './utils/Header.vue';
import WorkCard from './utils/WorkCard.vue';
</script>

<template>
    <n-layout position="absolute">
        <n-layout-header
            style="height: 70px; padding: 10px;"
            bordered
        >
            <Header title="内务主页"/>
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
</template>

<style scoped>
</style>