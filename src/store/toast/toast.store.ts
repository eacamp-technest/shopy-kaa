import {create} from 'zustand';
import {IToastStore} from './toast.types';
import {hideToastAction, showToastAction} from './toast.utils';

const initial: Omit<IToastStore, 'actions'> = {
  icon: null,
  message: '',
  severity: 'default',
  show: false,
  timeoutId: null,
};

export const useToastStore = create<IToastStore>(set => ({
  ...initial,
  actions: {
    showToast: showToastAction(set),
    hideToast: hideToastAction(set, initial),
  },
}));
