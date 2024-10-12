<script setup lang="ts">
import { NFlex, NCard, NButton } from 'naive-ui';
import { h, type VNode } from 'vue';

const props = defineProps({
    workname: {
        type: String,
    },
    cur_username: {
        type: String,
    },
    next_username: {
        type: String
    },
    last_completed_time: {
        type: String
    }
});

const cardTitle: VNode = h(
    'div',
    [
        h('h2', props.workname),
        h('h4', props.cur_username),
        h('h5', { style: 'color: gray;' }, `下一位是: ${props.next_username}`)
    ]
);
</script>

<template>
    <n-card 
        :title="() => cardTitle"
        size="small"
        hoverable
        embedded
    >
        <template #header-extra>
            <h3 style="color: gray">{{ props.last_completed_time }}</h3>
        </template>
        <template #default>
            <n-flex>
                <n-button type="primary" round>
                提交
                </n-button>
                <n-button>
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