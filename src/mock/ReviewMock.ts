import {IReview} from 'components/Review';
import {ImageSourcePropType} from 'react-native';
import {vectors} from 'screens/Account.Screen';

export const mockReviews: IReview[] = [
  {
    date: 'Yesterday',
    star: 5,
    name: 'Robert',
    image: require('assets/images/profile_photo.png'),
    surname: 'Fox',
    description:
      'Andrew at the store was super helpful. Very quick and encouraging with a pair of shoes I was unsure of. They also had great sale going on. Shout outs to everyone there.',
  },
  {
    date: 'Jun 25, 2024',
    star: 4,
    name: 'Cameron',
    image: require('assets/images/profile_photo2.png'),
    surname: 'Williamson',
    description:
      'Steph was friendly and explained All of Shoppay reward programs in complete detail. I appreciated this. Truly wish would have been in the loop sooner!.',
  },
  {
    date: 'Jun 16, 2024',
    star: 3,
    name: 'Guy',
    image: require('assets/images/profile_photo3.png'),
    surname: 'Hawkin',
    description:
      'Customer service was great. From the moment we walked in to the moment we checked out everyone was nice and helpful. Shoe variety was good and loved the shoes.',
  },
  {
    date: 'Jun 10, 2024',
    star: 2,
    name: 'Bob',
    image: require('assets/images/profile_photo4.png'),
    surname: 'Brown',
    description:
      'Not very satisfied. The product has some issues that need to be addressed.',
  },
  {
    date: 'Jun 8, 2024',
    star: 1,
    name: 'Charlie',
    image: require('assets/images/profile_photo.png'),
    surname: 'Davis',
    description:
      'Very disappointed. The product did not meet my expectations at all.',
  },
];
