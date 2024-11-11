<script setup lang="ts">
import { NTime, NInfiniteScroll, NTabs, NTabPane, NFlex, NCard, NButton, useMessage, NModal, NIcon } from 'naive-ui';
import { ref, h, watchEffect, type VNode, type Ref, nextTick } from 'vue';
import { fetchLogData, fetchUserName, fetchWorkStat, calculateTimeDifference, postLog, postXiaoAiNotify, fetchUserRealName } from '@/utils';
import IconWarning from '../icons/IconWarning.vue';
import IconLogEmpty from '../icons/IconLogEmpty.vue';
import IconLoading from '../icons/IconLoading.vue';

interface ProcessedWorkData {
    work_name: string;
    cur_username: string;
    next_username: string; 
    last_completed_time: string;
    cur_user_id: string;
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
// watchEffect(() => {
//     cardTitle.value = h(
//         'div',
//         [
//             h('h2', processedWorkData.value?.work_name || 'null'),
//             h('h4', processedWorkData.value?.cur_username || 'null'),
//             h('h5', { style: 'color: gray;' }, `下一位是: ${processedWorkData.value?.next_username || 'null'}`)
//         ]
//     );
// });
watchEffect(() => {
    cardTitle.value = h(
        'h2',
        { style: 'margin: 20px; margin-bottom: 0;' },
        processedWorkData.value?.work_name || 'null'
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
        await updateLog();
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
        const cur_realname = await fetchUserRealName(parseInt(processedWorkData.value.cur_user_id));
        const status = await postXiaoAiNotify(cur_realname || 'NULL', props.work_name);
        if (status) {
            message.success('通知成功');
        }
        else {
            message.error('通知失败');
        }
    }
    isNotifying.value = false;
};

// 日志显示
const log_loading = ref(true);
const log_nomore = ref(false);
const log_empty = ref(false);
let log_count = 4;
const log_display: Ref<{ 
    user_name: String | undefined;
    log_time: number;
}[]> = ref([]);
let logData = [];

const updateLog = async () => {
    log_nomore.value = false;
    log_empty.value = true;
    log_loading.value = true;
    log_display.value = [];
    log_count = 4;
    logData = await fetchLogData(log_count, undefined, props.work_id) || [];
    for (let log of logData) {
        const filtered_log: {
            user_name: String | undefined;
            log_time: number;
        } = {
            user_name: undefined,
            log_time: log.log_time * 1000
        }
        filtered_log.user_name = await fetchUserName(log.user_id);
        log_display.value.push(filtered_log)
    }

    if (log_display.value.length)
        log_empty.value = false;
    log_loading.value = false;
}
const LogDataLoad = async () => {
    if (log_loading.value || log_nomore.value)
        return;
    log_loading.value = true;
    
    const log_new_count = log_count + 3;
    logData = await fetchLogData(log_new_count, undefined, props.work_id) || [];
    // 延时
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    for (let i = log_count; i < logData.length; i++) {
        const filtered_log: {
            user_name: String | undefined;
            log_time: number;
        } = {
            user_name: undefined,
            log_time: logData[i].log_time * 1000
        }
        filtered_log.user_name = await fetchUserName(logData[i].user_id);
        log_display.value.push(filtered_log) 
    }

    if (logData.length <= log_count)
        log_nomore.value = true
    log_count = log_new_count;
    log_loading.value = false;
}

await updateLog();
</script>

<template>
    <n-card 
        :title="() => cardTitle"
        size="small"
        hoverable
        embedded
    >
        <template #header-extra>
            <h3 style="margin: 20px; margin-bottom: 0; color: gray">{{ processedWorkData?.last_completed_time }}</h3>
        </template>
        <template #default>
            <n-tabs
                type="bar"
                size="medium"
                :tabs-padding="20"
                pane-style="margin: 20px; margin-top: 0; width: auto;"
            >
                <n-tab-pane name="MAIN">       
                    <n-flex vertical>
                        <h3 style="margin: 0; margin-top: 10px; margin-bottom: 10px;">
                            {{ processedWorkData?.cur_username || 'null' }}
                        </h3>
                        <h4 style="margin: 0; margin-bottom: 20px; color: gray;">
                            {{ `下一位是: ${processedWorkData?.next_username}` || 'null' }}
                        </h4>
                    </n-flex>
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
                </n-tab-pane>
                <n-tab-pane name="LOG">
                    <n-infinite-scroll style="height: 130.61px;" :distance="10" @load="LogDataLoad">
                        <n-flex style="margin-top: 15px;" v-for="log in log_display" justify="space-between" align="center">
                            <h4 style="margin: 0;">
                                {{ log.user_name }}
                            </h4>
                            <n-time style="color: gray;" :time="log.log_time"/>
                        </n-flex>
                        <n-flex style="margin: 25px;" v-if="log_empty" align="center" justify="center" vertical>
                            <n-icon :size="40">
                                <IconLogEmpty />
                            </n-icon>
                            <h3 style="margin: 0;">
                                日记为空
                            </h3>
                        </n-flex>
                        <h5 v-else-if="log_loading">
                            <n-icon :size="20">
                                <IconLoading />
                            </n-icon>
                        </h5>
                        <h3 v-else-if="log_nomore">
                            没有啦
                        </h3>
                    </n-infinite-scroll>
                </n-tab-pane>
            </n-tabs>
        </template>
    </n-card>
</template>

<style scoped>
.content-style {
    margin: 30px;
}
</style>