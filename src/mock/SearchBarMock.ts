import {ImageSourcePropType} from 'react-native';
import {StackRoutes} from 'router/routes';
import {NavigationParamList} from 'types/navigation.types';

export interface ICardProduct {
  id: number;
  title: string;
  price: number;
  image: ImageSourcePropType | undefined;
  url: string;
}

export interface ISuggestionMock {
  id: number;
  title: string;
  source: ImageSourcePropType | undefined;
  onPress: string;
}

export const product: ICardProduct[] = [
  {
    id: 0,
    title: 'Nike Air Max 90',
    price: 45,
    image: require('../assets/images/product1.png'),
    url: 'Nike.com',
  },
  {
    id: 1,
    title: 'Mecon 3 Shoes',
    price: 10,
    image: require('../assets/images/product2.png'),
    url: 'Nike.com',
  },
  {
    id: 2,
    title: 'Nike Air Force 1 Shoe',
    price: 100,
    image: require('../assets/images/product3.png'),
    url: 'Nike.com',
  },
  {
    id: 3,
    title: 'Vapor Max 2020',
    price: 75,
    image: require('../assets/images/product4.png'),
    url: 'Nike.com',
  },
  {
    id: 4,
    title: 'Nike Air Max 90',
    price: 45,
    image: require('../assets/images/product5.png'),
    url: 'Nike.com',
  },
  {
    id: 5,
    title: 'Mecon 3 Shoes',
    price: 10,
    image: require('../assets/images/product6.png'),
    url: 'Nike.com',
  },
  {
    id: 6,
    title: 'Air Max Excee',
    price: 75,
    image: require('../assets/images/product1.png'),
    url: 'Nike.com',
  },
  {
    id: 7,
    title: 'Vapor Max 2020',
    price: 75,
    image: require('../assets/images/product2.png'),
    url: 'Nike.com',
  },
  {
    id: 8,
    title: 'Nike Air Max 90',
    price: 75,
    image: require('../assets/images/product3.png'),
    url: 'Nike.com',
  },
  {
    id: 9,
    title: 'Mecon 3 Shoes',
    price: 75,
    image: require('../assets/images/product4.png'),
    url: 'Nike.com',
  },
  {
    id: 10,
    title: 'Nike Air Max 90',
    price: 75,
    image: require('../assets/images/product5.png'),
    url: 'Nike.com',
  },
  {
    id: 11,
    title: 'Mecon 3 Shoes',
    price: 75,
    image: require('../assets/images/product6.png'),
    url: 'Nike.com',
  },
];
export const suggestionMock: ISuggestionMock[] = [
  {
    id: 1,
    source: require('assets/images/women_suggestion.png'),
    title: 'Women',
    onPress: StackRoutes.womenlists,
  },
  {
    id: 2,
    source: require('assets/images/men_suggestion.png'),
    title: 'Men',
    onPress: StackRoutes.menlist,
  },
  {
    id: 3,
    source: require('assets/images/kids_suggestion.png'),
    title: 'Kids',
    onPress: StackRoutes.kidslists,
  },
  {
    id: 4,
    source: require('assets/images/teens_suggestion.png'),
    title: 'Teens',
    onPress: StackRoutes.teenslist,
  },
];
