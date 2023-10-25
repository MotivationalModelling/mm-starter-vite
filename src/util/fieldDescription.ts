
export type ISODate = string
export type ISODateTime = string

type KeysOfType<T, V> = {
  [K in keyof T]: V extends T[K] ? K : never;
}[keyof T];

export interface FieldDescription<T> {
  text?: KeysOfType<T, string | number>[]
  date?: KeysOfType<T, Date>[]
  isoDate?: KeysOfType<T, ISODate>[]
  isoDateTime?: KeysOfType<T, ISODateTime>[]
  bool?: KeysOfType<T, boolean>[]
}