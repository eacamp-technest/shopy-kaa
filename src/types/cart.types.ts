import {ImageSourcePropType} from 'react-native';

export type CartItem = {
  id: number;
  price: number;
  image: ImageSourcePropType | undefined;
  title: string;
  quantity?: number;
  images?: any;
};

export interface ICardProduct {
  id: number;
  title: string;
  price: number;
  images: any;
  url: string;
  category?: any;
}
