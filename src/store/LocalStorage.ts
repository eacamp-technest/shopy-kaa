import {MMKV} from 'react-native-mmkv';
import {ICardInputForm} from 'types/card-types';
import {
  StorageKeys,
  StorageMethods,
  StorageMethodsKeys,
  TFunctionalMethod,
} from 'types/local.storage.types';
import {IUser} from 'types/user';
import {IAddress} from './address/address.types';
import {CartItem} from 'types/cart.types';

const storage = new MMKV();

export class LocalStorage {
  private static set(
    key: StorageKeys,
    method: StorageMethodsKeys,
    data?: StorageMethods,
  ) {
    if (['string', 'number', 'boolean'].includes(method)) {
      storage.set(key, data as string | number | boolean);
      return;
    }

    if (['object', 'array'].includes(method)) {
      storage.set(key, JSON.stringify(data));
      return;
    }

    throw Error('Not supported local storage method');
  }

  public static clean(key: StorageKeys | StorageKeys[] | 'all') {
    if (key === 'all') {
      return storage.clearAll();
    }

    if (Array.isArray(key)) {
      key.forEach(k => storage.delete(k));
      return;
    }

    storage.delete(key);
  }

  public static cards(method: TFunctionalMethod, data?: ICardInputForm[]) {
    if (method === 'get') {
      const cards = storage.getString(StorageKeys.cards);
      return cards ? JSON.parse(cards) : null;
    }
    this.set(StorageKeys.cards, 'array', data);
  }

  public static user(method: TFunctionalMethod, data?: IUser) {
    if (method === 'get') {
      const user = storage.getString(StorageKeys.user);
      return user ? JSON.parse(user) : null;
    }
    this.set(StorageKeys.user, 'object', data);
  }

  public static addresses(method: TFunctionalMethod, data?: IAddress[]) {
    if (method === 'get') {
      const addresses = storage.getString(StorageKeys.addresses);
      return addresses ? JSON.parse(addresses) : [];
    }
    this.set(StorageKeys.addresses, 'array', data);
  }

  public static selectedAddress(method: TFunctionalMethod, data?: string) {
    if (method === 'get') {
      return storage.getString(StorageKeys.selectedAddress) || null;
    }
    this.set(StorageKeys.selectedAddress, 'string', data);
  }
  public static selectedPayment(method: TFunctionalMethod, data?: string) {
    if (method === 'get') {
      return storage.getString(StorageKeys.selectedPayment) || null;
    }
    this.set(StorageKeys.selectedPayment, 'string', data);
  }

  public static carts(method: TFunctionalMethod, data?: CartItem[]) {
    if (method === 'get') {
      const carts = storage.getString(StorageKeys.carts);
      return carts ? JSON.parse(carts) : [];
    }
    this.set(StorageKeys.carts, 'array', data);
  }

  public static totalPrice(method: TFunctionalMethod, data?: number) {
    if (method === 'get') {
      const totalPrice = storage.getString(StorageKeys.totalPrice);
      return totalPrice ? JSON.parse(totalPrice) : 0;
    }
    this.set(StorageKeys.totalPrice, 'number', data);
  }
}
