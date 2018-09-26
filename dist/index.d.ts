import { VueConstructor } from 'vue';
declare const picker: {
    PickerView: VueConstructor<{
        localValue: any[];
        localData: import("./PickerView").PickerData;
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
        data: import("./PickerView").PickerData;
        preData: import("./PickerView").PickerData;
        postData: import("./PickerView").PickerData;
        primaryKey: string | number;
        cascaded: boolean;
    } & import("vue/types/vue").Vue>;
    install: (Vue: VueConstructor<import("vue/types/vue").Vue>) => void;
};
export default picker;
