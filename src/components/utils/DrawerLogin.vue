<script setup lang="ts">
import type { LoginDrawer } from '@/types/components/Home';
import { deleteAccessToken, UpdateAccessToken, updateUserData } from '@/utils';
import { NFlex, NForm, NFormItem, NInput, NButton, useMessage, NMessageProvider, type FormInst } from 'naive-ui';
import { ref, inject } from 'vue';

interface ModelType {
    username: string | null;
    password: string | null;
}

// 获取登录界面接口
const {
    activeBottomDrawer,
    activateBottomDrawer
} = inject('loginDrawer') as LoginDrawer;

// 表单
const formRef = ref<FormInst | null>(null);
const modelRef = ref<ModelType>({
    username: null,
    password: null,
});
const message = useMessage();
const rules = {
    username: {
        required: true,
        message: '请输入用户名',
        trigger: ['input']
    },
    password: {
        required: true,
        message: '请输入密码',
        trigger: ['input']
    }
}
const handleValidateClick = (e: MouseEvent): void => {
    e.preventDefault()
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            let updateStatus = await UpdateAccessToken(modelRef.value.username as string, modelRef.value.password as string);
            if (updateStatus) {
                updateStatus = await updateUserData();
                if (updateStatus) {
                    message.success('Login Success');
                    activeBottomDrawer.value = false;
                }
                else {
                    message.error('Get UserData Fail');
                    deleteAccessToken();
                }
            }
            else {
                message.error('Login Fail');
            }
        }
        else {
            console.log(errors)
            message.error('Please Fill in the Form');
        }
    })
}
</script>

<template>
    <n-form ref="formRef" :model="modelRef" :rules="rules" size="large">
        <n-flex vertical style="padding-left: 15vw; padding-right: 15vw;">
            <n-form-item 
                path="username">
                <n-input 
                    round
                    v-model:value="modelRef.username"
                    placeholder="请输入用户名" 
                    :input-props="{ autocomplete: 'off' }"
                    @keydown.enter.prevent />
            </n-form-item>
            <n-form-item path="password">
                <n-input 
                    round
                    v-model:value="modelRef.password" 
                    show-password-on="click" 
                    type="password" 
                    placeholder="请输入密码" 
                    :input-props="{ autocomplete: 'off' }"
                    @keydown.enter.prevent />
            </n-form-item>
            <n-form-item>
                <n-button 
                    round 
                    type="primary"
                    attr-type="button" 
                    style="width: 100%;"
                    @click="handleValidateClick">
                    登录
                </n-button>
            </n-form-item>
        </n-flex>
    </n-form>
</template>

<style scoped>
</style>