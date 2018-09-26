import { PickerData, RawPickerData } from './interfaces'

export const inBrowser: boolean = typeof window !== 'undefined'

const defaultEventOptions: AddEventListenerOptions = { passive: false, capture: false }

export function bindEvent(
  el: EventTarget,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options: AddEventListenerOptions = defaultEventOptions
): () => void {
  el.addEventListener(type, listener, options)
  return () => unbindEvent(el, type, listener, options)
}

export function unbindEvent(
  el: EventTarget,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options: AddEventListenerOptions = defaultEventOptions
): void {
  el.removeEventListener(type, listener, options)
}

export function normalizeData(data: RawPickerData, cascaded: boolean): PickerData {
  return (cascaded ? [data] : data.slice()) as PickerData
}
