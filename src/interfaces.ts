export type PickerValue = any[]

export interface PickerItem {
  label: string | number,
  value: any,
  children?: PickerData
}

export type PickerData = PickerItem[][]

export type CascadedPickerData = PickerItem[]

export type RawPickerData = CascadedPickerData | PickerData

export enum Directions {
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

export enum Status {
  WAITING = 1,
  STARTED = 2,
  MOVING = 4,
  FIRST_MOVE = 8,
  ENDED = 16,
  IN_TRANSITION = 32,
  CANCELED = 64
}
