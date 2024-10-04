import type { Ref } from "vue";
import type { GlobalTheme } from "naive-ui";

export interface Theme {
    theme: Ref<GlobalTheme | null>;
    handleSetTheme: (value: boolean) => void;
}

export interface AvatarLoc {
    avatarX: Ref<number>;
    avatarY: Ref<number>;
    getAvatarLoc: () => void;
    isActive: Ref<boolean>;
    isLogining: Ref<boolean>;
}