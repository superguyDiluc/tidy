export interface ServiceOption {
    tag: string;
    event: (() => void) | undefined;
}