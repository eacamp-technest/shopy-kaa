import { useCartStore } from "./cart.store";

export const useCartStoreActions = () => useCartStore(state => state.actions);
