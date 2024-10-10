<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { fetchAllWork, fetchUserName, fetchWorkStat } from '@/utils';
import WorkCard from './WorkCard.vue';

interface ProcessedWorkData {
    work_name: string;
    cur_username: string;
    next_username: string; 
};

// 处理过的任务卡片数据
const processedWorkData: Ref<Array<ProcessedWorkData>> = ref([]);

// 原任务卡片数据
const workData = await fetchAllWork() || [];

// 异步获取处理后数据
processedWorkData.value = await Promise.all(workData.map(async (work) => {
    const workStat = await fetchWorkStat(work.work_id, 2) || [];
    return {
        work_name: work.work_name,
        cur_username: await fetchUserName(workStat[0]?.user_id) || 'null',
        next_username: await fetchUserName(workStat[1]?.user_id) || 'null'
    };
}));
</script>
<template>
    <WorkCard 
        v-for="item in processedWorkData" 
        :workname="item.work_name" 
        :cur_username="item.cur_username"
        :next_username="item.next_username"/>
</template>