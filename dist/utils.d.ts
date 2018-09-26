export declare const inBrowser: boolean;
export declare function bindEvent(el: EventTarget, type: string, listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions): () => void;
export declare function unbindEvent(el: EventTarget, type: string, listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions): void;
