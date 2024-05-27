import {useUserStore} from './user.store';
export const useUserStoreActions = () => useUserStore(state => state.actions);