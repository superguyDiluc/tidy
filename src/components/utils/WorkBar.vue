<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { fetchAllWork, fetchLogData, fetchUserName, fetchWorkStat, calculateTimeDifference } from '@/utils';
import WorkCard from './WorkCard.vue';

interface ProcessedWorkData {
    work_name: string;
    cur_username: string;
    next_username: string; 
    last_completed_time: string;
};

// 处理过的任务卡片数据
const processedWorkData: Ref<Array<ProcessedWorkData>> = ref([]);

// 原任务卡片数据
const workData = await fetchAllWork() || [];

// 异步获取处理后数据
processedWorkData.value = await Promise.all(workData.map(async (work) => {
    const workStat = await fetchWorkStat(work.work_id, 2) || [];
    const logData = await fetchLogData(1, undefined, 1) || [];
    let lastCompletedTime = 'null';
    if (logData[0]) {
        const { days, hours, minutes, seconds } = calculateTimeDifference(logData[0].log_time);
        if (days) {
            lastCompletedTime = `${days}天前`;
        }
        else if (hours) {
            lastCompletedTime = `${hours}小时前`;
        }
        else if (minutes) {
            lastCompletedTime = `${minutes}分钟前`;
        }
        else {
            lastCompletedTime = `${seconds}秒前`;
        }
    }
    return {
        work_name: work.work_name,
        cur_username: await fetchUserName(workStat[0]?.user_id) || 'null',
        next_username: await fetchUserName(workStat[1]?.user_id) || 'null',
        last_completed_time: lastCompletedTime
    };
}));
</script>
<template>
    <WorkCard 
        v-for="item in processedWorkData" 
        :workname="item.work_name" 
        :cur_username="item.cur_username"
        :next_username="item.next_username"
        :last_completed_time="item.last_completed_time"/>
</template>