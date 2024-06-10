import {useToastStore} from './toast.store';

export const useToast = () => useToastStore(state => state.actions.showToast);
