export type StorageMethodsKeys =
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'array';

export type StorageMethods = string | number | boolean | object | any[];
export type TFunctionalMethod = 'set' | 'get';

export enum StorageKeys {
  cards = 'cards',
}
