<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NIcon, NButton } from 'naive-ui';
import IconUserAvatarLight from './icons/IconUserAvatarLight.vue';

const status = ref(1);
const distanceToLeft = ref(window.innerWidth / 2);
onMounted(() => {
    let toRight = document.getElementById('button')?.getBoundingClientRect().right;
});
</script>

<template>
    <div class="wrapper">
        <h1>测试场</h1>
        <n-button id="button" @click="status++">
            切换状态
        </n-button>
        <Transition name="move">
            <n-icon :key="status" 
                :size="120"
                :style="{ top: '100px'}">
                <IconUserAvatarLight />
            </n-icon>
        </Transition>
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

.icon-style {
    position: absolute;
}

.move-leave-active {
    animation: move-to-corner 1s ease;
}

@keyframes move-to-corner {
    0% {
        transform: translate(0px, 0px) scale(1);
    }
    100% {
        transform: translate(-100px, -100px) scale(0.4);
    }
}
</style>