import { CascadedPickerData, PickerData, RawPickerData } from './interfaces'

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
  if (!cascaded) return (data as PickerData)
  return ([(data as CascadedPickerData).map(item => {
    if (item) {
      if (Array.isArray(item.children)) {
        item.children = normalizeData(item.children, cascaded)
      } else {
        delete item.children
      }
    }
    return item
  })] as PickerData)
}
