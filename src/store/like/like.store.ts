import {create} from 'zustand';
import {LocalStorage} from 'store/LocalStorage';
import {ILikeStore} from './like.types';
import {ICardProduct} from 'types/cart.types';

export const useLikeStore = create<ILikeStore>((set, get) => ({
  likedItems: [],
  actions: {
    initialize: () => {
      const likedItems = LocalStorage.likedItems('get');
      set({likedItems});
    },
    addLikedItem: (item: ICardProduct) => {
      const updated = [...get().likedItems, item];
      set({likedItems: updated});
      LocalStorage.likedItems('set', updated);
    },
    removeLikedItem: (id: number) => {
      const updated = get().likedItems.filter(item => item.id !== id);
      set({likedItems: updated});
      LocalStorage.likedItems('set', updated);
    },
    reset: () => set({likedItems: []}),
  },
}));
