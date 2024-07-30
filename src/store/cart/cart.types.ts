import {CartItem} from 'types/cart.types';

interface ICartStoreActions {
  initialize: () => void;
  addToCart: (item: CartItem) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  deleteItemFromCart: (id: number) => void;
  calculateTotalPrice: () => void;
  reset: () => void;
}

export interface ICartStore {
  carts: CartItem[];
  totalPrice: number;
  actions: ICartStoreActions;
}
