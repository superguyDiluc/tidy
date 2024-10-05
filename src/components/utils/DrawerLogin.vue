<script setup lang="ts">
import type { LoginDrawer } from '@/types/components/Home';
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
    formRef.value?.validate((errors) => {
        if (!errors) {
            message.success('Valid')
            activeBottomDrawer.value = false;
        }
        else {
            console.log(errors)
            message.error('Invalid')
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