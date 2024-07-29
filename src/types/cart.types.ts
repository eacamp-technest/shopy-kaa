import {ImageSourcePropType} from 'react-native';

export type CartItem = {
  id: number;
  price: number;
  image: ImageSourcePropType | undefined;
  title: string;
  quantity?: number;
};
