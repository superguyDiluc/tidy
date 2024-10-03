import { ref, onMounted, onUnmounted } from "vue";

export function useTraceElementLoc(target: HTMLElement) {
    const left = ref(0);
    const top = ref(0);

    function update() {
        left.value = target.getBoundingClientRect().left;
        top.value = target.getBoundingClientRect().top;
    }

    onMounted(() => window.addEventListener('resize', update));
    onUnmounted(() => window.removeEventListener('resize', update));

    return { left, top };
}