import {IToastStore} from './toast.types';

const DURATION = 5000;

const vectors = {
  default: null,
  info: require('../../assets/vectors/toast_info.svg'),
  success: require('../../assets/vectors/toast_success.svg'),
  warning: require('../../assets/vectors/toast_warning.svg'),
  error: require('../../assets/vectors/toast_error.svg'),
};

export const showToastAction =
  (set: any) => (severity: IToastStore['severity'], message: string) => {
    set((state: IToastStore) => {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        set({
          show: false,
          severity: 'default',
          message: '',
          icon: null,
        });
      }, DURATION);

      return {
        show: true,
        severity,
        message,
        icon: vectors[severity],
        timeoutId: newTimeoutId,
      };
    });
  };

export const hideToastAction =
  (set: any, initialState: Omit<IToastStore, 'actions'>) => () => {
    set((state: IToastStore) => {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }
      return {...initialState};
    });
  };
