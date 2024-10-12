<script setup lang="ts">
import { NFlex, NIcon } from 'naive-ui';
import { useRouter, type Router } from 'vue-router';
import { inject, type Ref } from 'vue';
import IconUserAvatarLight from '../icons/IconUserAvatarLight.vue';
import IconLogout from '../icons/IconLogout.vue';
import CommonCard from './CommonCard.vue';
import type { Drawer } from '@/types/components/Home';
import type { ServiceOption } from '@/types/components/utils/DrawerContent';
import { deleteAccessToken } from '@/utils';

// 路由
const router: Router = useRouter();

// 用户信息
const userData = {
    username: localStorage.getItem('user_name') || 'NULL',
    useradmin: localStorage.getItem('user_admin') || 'NULL'
};

// 导入抽屉控制
const { active, activateDrawer} = (inject('drawer') as Drawer);
// 导入更新任务栏
const updateWorkBar = inject('updateWorkBar') as Ref<number>;

// 可渲染服务
const serviceOptions: Array<ServiceOption> = [
    {
        tag: "管理员面板",
        event: undefined
    },
    {
        tag: "个人信息",
        /*
            关闭抽屉并跳转路由
        */
        event: async (): Promise<void> => {
            await router.push('/userdata');
            active.value = false;
        }
    },
];

/*
    退出登录
*/
const logout = () => {
    deleteAccessToken();
    updateWorkBar.value++;
    active.value = false;
};

</script>

<template>
    <n-flex vertical justify="space-between">
        <n-flex align="center" :size="8">
            <NIcon :size="45">
                <IconUserAvatarLight />
            </NIcon>
            <n-flex vertical :size="0">
                <h3 style="margin: 0;">{{ userData.username }}</h3>
                <span style="color: gray;">{{ userData.useradmin }}</span>
            </n-flex>
        </n-flex>
        <n-flex style="padding-top: 30px; padding-bottom: 30px;">
            <template #default>
                <CommonCard v-for="option in serviceOptions" :tag="option.tag" @click="option.event"/>
            </template>
        </n-flex>
        <n-flex justify="center" align="center" style="position: fixed; bottom: 16px;">
            <NIcon :size="35" @click="logout">
                <IconLogout />
            </NIcon>
        </n-flex>
    </n-flex>
</template>

<style scoped>
</style>