export interface IAddress {
  id: string;
  name: string;
  address: string;
}

interface IAddressStoreActions {
  addAddress: (address: IAddress) => void;
  removeAddress: (id: string) => void;
  selectAddress: (id: string | null) => void;
  initialize: () => void;
  reset: () => void;
  logout: () => void;
}

export interface IAddressStore {
  addresses: IAddress[];
  selectedAddress: IAddress | null;
  actions: IAddressStoreActions;
}
