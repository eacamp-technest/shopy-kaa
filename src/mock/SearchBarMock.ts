import {ImageSourcePropType} from 'react-native';
import {StackRoutes} from 'router/routes';
import {NavigationParamList} from 'types/navigation.types';

export interface ICardProduct {
  id: number;
  title: string;
  price: number;
  images: any;
  url: string;
  category?: any;
}

export interface ISuggestionMock {
  id: number;
  title: string;
  source: ImageSourcePropType | undefined;
  onPress: any;
}

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
