import {create} from 'zustand';
import {IUserStore} from './user.types';

const initial: Omit<IUserStore, 'actions'> = {
  user: null,
  selectedCard: null,
  cards: [],
};

export const useUserStore = create<IUserStore>((set, get) => ({
  ...initial,
  actions: {
    addCard: card => {
      const isExist = get().cards.find(info => info.id === card.id);

      if (!isExist) {
        set(state => ({cards: [...state.cards, card]}));
      }
    },
    selectCard: id => {
      if (id === null) {
        return set({selectedCard: null});
      }

      const card = get().cards.find(data => data.id === id);
      set({selectedCard: card});
    },
    removeCard: id => {
      const state = get().cards.filter(data => data.id !== id);
      set({cards: state});
    },
    reset: () => set({...initial}),
  },
}));
