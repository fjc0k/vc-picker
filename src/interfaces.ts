export type PickerValue = any[]

export interface PickerItem {
  label: string | number,
  value: any,
  children?: CascadedPickerData
}

export type PickerData = PickerItem[][]

export type CascadedPickerData = PickerItem[]

export type RawPickerData = CascadedPickerData | PickerData

export enum Directions {
  NONE = 1,
  UP = 2,
  DOWN = 4
}

export enum Status {
  WAITING = 1,
  STARTED = 2,
  MOVING = 4,
  ENDED = 8,
  IN_TRANSITION = 16,
  CANCELED = 32
}
