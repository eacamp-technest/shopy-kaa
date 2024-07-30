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
  user = 'user',
  payment = 'payment',
  addresses = 'addresses',
  selectedAddress = 'selectedAddress',
  selectedPayment = 'selectedPayment',
  carts = 'carts',
  totalPrice = 'totalPrice',
  likedItems = 'likedItems',
}
