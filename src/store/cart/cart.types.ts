export type CartItem = {
    id: number;
    price: number;
    size?: string | null;
    color?: string | null;
    image?: string;
    title?: string;
    quantity?: number;
  };
  
interface ICartStoreActions {
    initialize: () => void;
    addToCart: (item: CartItem) => void;
    updateItemQuantity: (id: number, quantity: number) => void;
    deleteItemFromCart: (item: CartItem) => void;
    calculateTotalPrice: () => void;
    reset: () => void;
}

export interface ICartStore {
    carts: CartItem[];
    totalPrice: number;
    actions: ICartStoreActions;
}
