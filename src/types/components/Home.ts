import type { Ref } from "vue"

export interface Drawer {
    active: Ref<boolean>;
    activateDrawer: () => void;
};