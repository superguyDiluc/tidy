<script setup lang="ts">
import { NFlex, NCard, NButton } from 'naive-ui';
import { h, type VNode } from 'vue';

const cardTitle: VNode = h(
    'div',
    [
        h('h2', '洗厕所'),
        h('h4', 'wmz'),
        h(
            'h5', { style: 'color: gray;' },'下一位是: yyj')
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
            <h3 style="color: gray">10天前</h3>
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