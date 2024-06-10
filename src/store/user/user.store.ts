import {create} from 'zustand';
import {IUserStore} from './user.types';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const initial: Omit<IUserStore, 'actions'> = {
  user: null,
  selectedCard: null,
  cards: [],
};

export const useUserStore = create<IUserStore>((set, get) => ({
  ...initial,
  actions: {
    initialize() {
      const cards = storage.getString('cards');
      if (cards) {
        set({cards: JSON.parse(cards)});
      }
    },
    addCard: card => {
      const isExist = get().cards.find(info => info.id === card.id);

      if (!isExist) {
        const updated = [...get().cards, card];
        set({cards: updated});
        storage.set('cards', JSON.stringify(updated));
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
      storage.set('cards', JSON.stringify(state));
      set({cards: state});
    },
    reset: () => set({...initial}),
  },
}));
