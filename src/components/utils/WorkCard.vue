<script setup lang="ts">
import { NFlex, NCard, NButton, useMessage, NModal, NIcon } from 'naive-ui';
import { ref, h, watchEffect, type VNode, type Ref, nextTick } from 'vue';
import { fetchLogData, fetchUserName, fetchWorkStat, calculateTimeDifference, postLog, testDelay, postXiaoAiNotify } from '@/utils';
import IconWarning from '../icons/IconWarning.vue';

interface ProcessedWorkData {
    work_name: string;
    cur_username: string;
    next_username: string; 
    last_completed_time: string;
    cur_user_id: String;
};

const props = defineProps({
    work_id: {
        type: Number,
        required: true
    },
    work_name: {
        type: String,
        required: true
    }
});

// 处理过的任务卡片数据
const processedWorkData: Ref<ProcessedWorkData | undefined> = ref();

// 获取处理数据
async function getProcessedWorkData() {
    const workStat = await fetchWorkStat(props.work_id, 2) || [];
    const logData = await fetchLogData(1, undefined, props.work_id) || [];
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
        work_name: props.work_name,
        cur_username: await fetchUserName(workStat[0]?.user_id) || 'null',
        next_username: await fetchUserName(workStat[1]?.user_id) || 'null',
        last_completed_time: lastCompletedTime,
        cur_user_id: workStat[0]?.user_id.toString() || 'null'
    };
}

// 异步获取处理后数据
processedWorkData.value = await getProcessedWorkData();

const cardTitle = ref<VNode | null>(null)
watchEffect(() => {
    cardTitle.value = h(
        'div',
        [
            h('h2', processedWorkData.value?.work_name || 'null'),
            h('h4', processedWorkData.value?.cur_username || 'null'),
            h('h5', { style: 'color: gray;' }, `下一位是: ${processedWorkData.value?.next_username || 'null'}`)
        ]
    );
});

// 处理提交事件
const isSubmitting = ref(false);
const message = useMessage();
const showCheckModal = ref(false);
const handleCheckUserID = (e: MouseEvent) => {
    e.preventDefault();

    // 查看当前任务是否为该用户的
    const user_id = localStorage.getItem('user_id');
    console.log(user_id);
    if (user_id === null) {
        message.info('Please Login First!');
        return;
    }
    if (user_id !== processedWorkData.value?.cur_user_id) {
        showCheckModal.value = true;
    }
    else {
        handleSubmitWork();
    }
}
// 处理提交任务
const handleSubmitWork = async () => {
    isSubmitting.value = true;

    let status;
    status = await postLog(props.work_id);
    if (status) {
        processedWorkData.value = await getProcessedWorkData();
        await nextTick();
        message.success('Submit Success!');
    }
    else {
        message.error('Submit Fail!');
    }

    isSubmitting.value = false;
};
// 处理通知
const isNotifying = ref(false);
const handleNotify = async () => {
    isNotifying.value = true;
    if (processedWorkData.value) {
        const status = await postXiaoAiNotify(processedWorkData.value.cur_username, props.work_name);
        if (status) {
            message.success('通知成功');
        }
        else {
            message.error('通知失败');
        }
    }
    isNotifying.value = false;
};
</script>

<template>
    <n-card 
        :title="() => cardTitle"
        size="small"
        hoverable
        embedded
    >
        <template #header-extra>
            <h3 style="color: gray">{{ processedWorkData?.last_completed_time }}</h3>
        </template>
        <template #default>
            <n-flex>
                <n-button :loading="isSubmitting" @click="handleCheckUserID" type="primary" round>
                    提交
                </n-button>
                <n-modal 
                    v-model:show="showCheckModal"
                    preset="dialog"
                    title="警告"
                    positive-text="确认"
                    negative-text="取消"
                    @positive-click="handleSubmitWork">
                    <h1>注意当前执行人不是你！是否提交？</h1>
                    <template #icon>
                        <n-icon>
                            <IconWarning />
                        </n-icon>
                    </template>
                </n-modal>
                <n-button
                    :loading="isNotifying" 
                    @click="handleNotify">
                    通知
                </n-button>
            </n-flex>
        </template>
    </n-card>
</template>

<style scoped>
.content-style {
    margin: 30px;
}
</style>