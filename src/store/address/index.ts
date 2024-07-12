import {useAddressStore} from './address.store';
export const useAddressStoreActions = () =>
  useAddressStore(state => state.actions);
