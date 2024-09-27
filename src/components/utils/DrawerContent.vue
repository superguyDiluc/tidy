<script setup lang="ts">
import { NFlex, NIcon } from 'naive-ui';
import { useRouter, type Router } from 'vue-router';
import IconUserAvatarLight from '../icons/IconUserAvatarLight.vue';
import IconLogout from '../icons/IconLogout.vue';
import CommonCard from './CommonCard.vue';
import type { ServiceOption } from '@/types/components/utils/DrawerContent';

// 路由
const router: Router = useRouter();

// 可渲染服务
const serviceOptions: Array<ServiceOption> = [
    {
        tag: "管理员面板",
        event: undefined
    },
    {
        tag: "个人信息",
        event: (): void => {
            router.push('/userdata');
        }
    },
];
</script>

<template>
    <n-flex vertical justify="space-between">
        <n-flex align="center" :size="8">
            <NIcon :size="45">
                <IconUserAvatarLight />
            </NIcon>
            <n-flex vertical :size="0">
                <h3 style="margin: 0;">Diluc</h3>
                <span style="color: gray;">管理员</span>
            </n-flex>
        </n-flex>
        <n-flex style="padding-top: 30px; padding-bottom: 30px;">
            <template #default>
                <CommonCard v-for="option in serviceOptions" :tag="option.tag" @click="option.event"/>
            </template>
        </n-flex>
        <n-flex justify="center" align="center" style="position: fixed; bottom: 16px;">
            <NIcon :size="35">
                <IconLogout />
            </NIcon>
        </n-flex>
    </n-flex>
</template>

<style scoped>
</style>