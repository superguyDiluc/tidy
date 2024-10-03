<script setup lang="ts">
import { NFlex, NGradientText, NIcon, NButton, NScrollbar } from 'naive-ui';
import { inject, nextTick, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import IconUserAvatarLight from './icons/IconUserAvatarLight.vue';
import IconUserSwitch from './icons/IconUserSwitch.vue';
import type { Router } from 'vue-router';
import type { AvatarLoc } from '@/types/App';

// 路由
const router: Router = useRouter();

/*
    登录
*/
const login = async () => {
    await router.push('/');
    // 为克隆头像添加class
    const avatar: HTMLElement | null = document.getElementById('loginAvatar');
    if (avatar) {
        isActive.value = true;
        setTimeout(async() => {
            isActive.value = false;
        }, 700);
    }
};

// 导入头像接口
const {
    avatarX,
    avatarY,
    getAvatarLoc,
    isActive
} = inject('avatar') as AvatarLoc;

// 处理挂载
onMounted(() => {
    console.log(1);
    getAvatarLoc();
    window.addEventListener('resize', getAvatarLoc);
})
onUnmounted(() => {
    window.removeEventListener('resize', getAvatarLoc);
});
</script>

<template>
    <div class="wrapper">
        <n-scrollbar>
            <n-flex 
                vertical 
                justify="space-between"
                style="height: 100%;"
                class="gradient-style wrapper"
            >
                <n-flex 
                    vertical 
                    justify="center" 
                    align="center"
                    style="padding: 80px;"
                >
                    <n-flex>
                        <n-gradient-text
                            :gradient="{
                                from: 'rgb(0, 197, 205)',
                                to: 'rgb(123, 104, 238)'
                            }"
                            :size="50"
                        >Tidy</n-gradient-text>
                    </n-flex>
                    <n-flex 
                        vertical
                        justify="center"
                        align="center"
                        :size="0"
                        style="padding-top: 120px;"
                    >
                        <NIcon 
                            :color="isActive ? 'rgba(0, 0, 0, 0)' : 'black'"
                            :size="120"
                            id="loginAvatar"
                        >
                            <IconUserAvatarLight />
                        </NIcon>
                        <h1>Diluc</h1>
                    </n-flex>
                </n-flex>
                <n-flex
                    justify="center"
                    align="center"
                >
                    <n-button
                        color="rgb(0, 127, 255)"
                        style="width: 300px;"
                        @click="login"
                    >
                        一键登录
                    </n-button>
                </n-flex>
                <n-flex
                    justify="center"
                    align="center"
                    style="padding: 50px;"
                >
                    <n-flex 
                        vertical
                        justify="center"
                        align="center"
                        :size="2"  
                    >
                        <n-button
                            circle
                            style="padding: 25px;"
                        >
                            <template #icon>
                                <n-icon :size="25">
                                    <IconUserSwitch />
                                </n-icon>
                            </template>
                        </n-button>
                        <span style="font-size: 0.8rem;">切换账号</span>
                    </n-flex>
                </n-flex>
            </n-flex>
        </n-scrollbar>
    </div>
</template>

<style scoped>
.wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

/*渐变色彩*/
.gradient-style {
    background-repeat: no-repeat;
    background-image: 
        radial-gradient(closest-side, #F099BC, rgba(255, 255, 255, 0)),
        radial-gradient(closest-side, #B4D8E1, rgba(255, 255, 255, 0)),
        radial-gradient(closest-side, rgb(171, 130, 255), rgba(255, 255, 255, 0));
    background-size: 130vw 130vh, 120vw 120vh, 100vw 150vh;
    background-position: -50vw -90vh, 10vw -40vh, -20vw -80vh;
    animation: 10s moiveAnimation infinite;
}

@keyframes moiveAnimation {
    0%,
    100% {
        background-size: 130vw 130vh, 120vw 120vh, 100vw 150vh;
        background-position: -50vw -90vh, 10vw -40vh, -20vw -80vh;
    }
    30% {
        background-size: 110vw 120vh, 120vw 120vh, 110vw 160vh;
        background-position: -40vw -85vh, 20vw -35vh, -10vw -85vh;
    }
    60% {
        background-size: 120vw 130vh, 120vw 120vh, 105vw 160vh;
        background-position: -45vw -80vh, 15vw -38vh, -15vw -85vh;
    }
    80% {
        background-size: 130vw 125vh, 120vw 120vh, 100vw 150vh;
        background-position: -42vw -79vh, 15vw -35vh, -15vw -75vh;
    }
}
</style>