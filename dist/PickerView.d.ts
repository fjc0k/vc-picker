import Vue from 'vue';
export declare type PickerValue = any[];
export declare type NormalPickerData = Array<Array<{
    label: string | number;
    value: any;
    children?: NormalPickerData;
}>>;
export declare type CascadedPickerData = Array<{
    label: string | number;
    value: any;
    children?: CascadedPickerData;
}>;
export declare type PickerData = NormalPickerData | CascadedPickerData;
export declare enum Directions {
    NONE = 1,
    LEFT = 2,
    RIGHT = 4,
    UP = 8,
    DOWN = 16,
    HORIZONTAL = 6,
    VERTICAL = 24,
    START = 10,
    END = 20
}
export declare enum Status {
    WAITING = 1,
    STARTED = 2,
    MOVING = 4,
    FIRST_MOVE = 8,
    ENDED = 16,
    IN_TRANSITION = 32,
    CANCELED = 64
}
declare const _default: import("vue/types/vue").VueConstructor<{
    localValue: any[];
    localData: PickerData;
    disposes: (() => void)[];
    status: Status;
    direction: Directions;
    startT: number;
    startX: number;
    startY: number;
    preX: number;
    preY: number;
} & {
    startOrUpdate(): void;
    handleTouchStart(e: TouchEvent): void;
    handleTouchMove(e: TouchEvent): void;
    handleTouchEnd(e: TouchEvent): void;
    handleTouchCancel(e: TouchEvent): void;
} & {
    value: any[];
    data: PickerData;
    preData: PickerData;
    postData: PickerData;
    primaryKey: string | number;
    cascaded: boolean;
} & Vue>;
export default _default;
