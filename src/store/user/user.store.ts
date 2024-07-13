import {create} from 'zustand';
import {IUserStore} from './user.types';
import {LocalStorage} from 'store/LocalStorage';
import {useToastStore} from 'store/toast/toast.store';
import {StorageKeys} from 'types/local.storage.types';

const {showToast} = useToastStore.getState().actions;

const initial: Omit<IUserStore, 'actions'> = {
  user: null,
  selectedCard: null,
  cards: [],
};

export const useUserStore = create<IUserStore>((set, get) => ({
  ...initial,
  actions: {
    initialize: () => {
      const cards = LocalStorage.cards('get');
      const user = LocalStorage.user('get');
      set({user});

      if (cards) {
        set({cards});
      }
    },
    logout: () => {
      LocalStorage.clean([
        StorageKeys.user,
        StorageKeys.cards,
        StorageKeys.addresses,
      ]);
      get().actions.reset();
      showToast('success', 'Logged out successfully');
    },
    initUser: user => {
      set({user});
      LocalStorage.user('set', user);
    },
    addCard: card => {
      const isExist = get().cards.find(info => info.id === card.id);

      if (!isExist) {
        const updated = [...get().cards, card];
        set({cards: updated});
        LocalStorage.cards('set', updated);
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

      if (state.length === 0) {
        LocalStorage.clean(StorageKeys.cards);
      } else {
        LocalStorage.cards('set', state);
      }
    },
    reset: () => set({...initial}),
  },
}));
