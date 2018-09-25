export const inBrowser: boolean = typeof window !== 'undefined'

export function keys(obj: object): string[] {
  return Object.keys(obj)
}
