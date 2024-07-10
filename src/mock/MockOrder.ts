import {TStatus} from 'components/StatusPill';

export interface IOrderData {
  orderNumber: string;
  trackingNumber: string;
  quantity: number;
  totalAmount: string;
  statusType: string | TStatus;
  date: string;
  statusContent: string;
  id: string;
}

export const orderData: IOrderData[] = [
  {
    date: '05-01-2020',
    orderNumber: '12412341',
    quantity: 5,
    totalAmount: '231',
    statusContent: 'Processing',
    statusType: 'Info',
    trackingNumber: 'A3N2DA2ASFEW',
    id: '1',
  },
  {
    date: '05-01-2020',
    orderNumber: '12412341',
    quantity: 5,
    totalAmount: '231',
    statusContent: 'Processing',
    statusType: 'Info',
    trackingNumber: 'A3N2DA2ASFEW',
    id: '2',
  },

  {
    date: '06-01-2020',
    orderNumber: '12412342',
    quantity: 3,
    totalAmount: '150',
    statusContent: 'Delivered',
    statusType: 'Success',
    trackingNumber: 'B4N2DA2ASFEW',
    id: '3',
  },
  {
    date: '06-01-2020',
    orderNumber: '12412342',
    quantity: 3,
    totalAmount: '150',
    statusContent: 'Delivered',
    statusType: 'Success',
    trackingNumber: 'B4N2DA2ASFEW',
    id: '4',
  },

  {
    date: '07-01-2020',
    orderNumber: '12412343',
    quantity: 2,
    totalAmount: '100',
    statusContent: 'Cancelled',
    statusType: 'Warning',
    trackingNumber: 'C5N2DA2ASFEW',
    id: '5',
  },
  {
    date: '07-01-2020',
    orderNumber: '12412343',
    quantity: 2,
    totalAmount: '100',
    statusContent: 'Cancelled',
    statusType: 'Warning',
    trackingNumber: 'C5N2DA2ASFEW',
    id: '6',
  },
];
