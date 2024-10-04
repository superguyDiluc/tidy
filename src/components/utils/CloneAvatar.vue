<script setup lang="ts">
import { inject, computed } from 'vue';
import type { AvatarLoc } from '@/types/App';
import { NIcon } from 'naive-ui';
import IconUserAvatarLight from '../icons/IconUserAvatarLight.vue';

// 导入头像接口
const {
    avatarX,
    avatarY,
    getAvatarLoc,
    isActive,
    isLogining
} = inject('avatar') as AvatarLoc;

// 计算克隆头像style对象
const activeStyle = computed(() => {
  return {
    left: `${avatarX.value}px`,
    top: `${avatarY.value}px`,
    opacity: isActive.value ? 1 : 0,
    transform: isActive.value ? `translate(${-avatarX.value - 35}px, ${-avatarY.value - 25}px) scale(0.25)` : '',
    transition: 'all 0.4s ease'
  };
});
</script>

<template>
    <n-icon v-if="isLogining"
        :size="120"
        class="avatar-style"
        :style="[activeStyle]"
    >
        <IconUserAvatarLight />
    </n-icon>
</template>

<style scoped>
/*移动头像*/
.avatar-style {
  position: absolute; 
  opacity: 0;
}
</style>