import type { Ref } from "vue";
import type { GlobalTheme } from "naive-ui";

export interface Theme {
    theme: Ref<GlobalTheme | null>;
    handleSetTheme: (value: boolean) => void;
}