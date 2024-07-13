import {create} from 'zustand';
import {IAddressStore, IAddress} from './address.types';
import {LocalStorage} from 'store/LocalStorage';
import {StorageKeys} from 'types/local.storage.types';

const initial: Omit<IAddressStore, 'actions'> = {
  addresses: [],
  selectedAddress: null,
};

export const useAddressStore = create<IAddressStore>((set, get) => ({
  ...initial,
  actions: {
    initialize: () => {
      const addresses = LocalStorage.addresses('get');
      const selectedAddressId = LocalStorage.selectedAddress('get');
      set({addresses});

      if (selectedAddressId) {
        const selectedAddress = addresses.find(
          (addr: any) => addr.id === selectedAddressId,
        );
        set({selectedAddress});
      }
    },
    addAddress: (address: IAddress) => {
      const updated = [...get().addresses, address];
      set({addresses: updated});
      LocalStorage.addresses('set', updated);
    },
    removeAddress: (id: string) => {
      const updated = get().addresses.filter(addr => addr.id !== id);
      set({addresses: updated});

      if (get().selectedAddress?.id === id) {
        set({selectedAddress: null});
        LocalStorage.clean(StorageKeys.selectedAddress);
      }

      LocalStorage.addresses('set', updated);
    },
    selectAddress: (id: string | null) => {
      if (id === null) {
        set({selectedAddress: null});
        LocalStorage.clean(StorageKeys.selectedAddress);
      } else {
        const selectedAddress = get().addresses.find(addr => addr.id === id);
        set({selectedAddress});
        LocalStorage.selectedAddress('set', id);
      }
    },
    logout: () => {
      LocalStorage.clean(StorageKeys.selectedAddress);
      get().actions.reset();
    },
    reset: () => set({...initial}),
  },
}));
