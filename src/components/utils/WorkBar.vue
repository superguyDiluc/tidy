<script setup lang="ts">
import WorkCard from './WorkCard.vue';
import { fetchAllWork } from '@/utils';
// 原任务卡片数据
const workData = await fetchAllWork() || [];
</script>
<template>
    <WorkCard 
        v-for="item in workData" 
        :work_id="item.work_id"
        :work_name="item.work_name" />
</template>