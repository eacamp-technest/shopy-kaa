type ToastSeverity = 'default' | 'info' | 'success' | 'warning' | 'error';

interface IToastStoreActions {
  showToast: (by: ToastSeverity, message: string) => void;
  hideToast: () => void;
}

export interface IToastStore {
  message: string;
  severity: ToastSeverity;
  show: boolean;
  timeoutId: NodeJS.Timeout | null;
  icon: null | string;
  actions: IToastStoreActions;
}
