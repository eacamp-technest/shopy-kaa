import {ImageSourcePropType, ImageStyle} from 'react-native';

export interface IBrand {
  logo: ImageSourcePropType | undefined;
  title: string;
  style?: ImageStyle;
}

export const brand: IBrand[] = [
  {title: 'Nike', logo: require('assets/images/brand_nike.png')},
  {title: 'Converse', logo: require('assets/images/brand_converse.png')},
  {title: 'Adidas', logo: require('assets/images/brand_adidas.png')},
  {title: 'Vans', logo: require('assets/images/brand_vans.png')},
];
