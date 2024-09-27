<script setup lang="ts">
import { NFlex, NCard, NIcon } from 'naive-ui';
import IconArrowForwardRight from '../icons/IconArrowForwardRight.vue';

// 传入属性
const props = defineProps({
    tag: {
        type: String,
        required: true
    }
});
</script>

<template>
    <n-card embedded hoverable>
        <n-flex justify="space-between" align="center">
            <h4 style="margin: 0;">{{ props.tag }}</h4>
            <NIcon :size="12">
                <IconArrowForwardRight />
            </NIcon>
        </n-flex>
    </n-card>
</template>

<style scoped>
</style>