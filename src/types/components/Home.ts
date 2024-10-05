import type { Ref } from "vue"

export interface Drawer {
    active: Ref<boolean>;
    activateDrawer: () => void;
};

export interface LoginDrawer {
    activeBottomDrawer: Ref<boolean>;
    activateBottomDrawer: () => void;
};