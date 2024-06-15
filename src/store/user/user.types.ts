import {ICardInputForm} from 'types/card-types';
import {IUser} from 'types/user';

interface IUserStoreActions {
  addCard: (card: ICardInputForm) => void;
  removeCard: (id: string) => void;
  selectCard: (id: string | null) => void;
  reset: () => void;
  initialize: () => void;
  initUser: (user: IUser) => void;
  logout: () => void;
}

export interface IUserStore {
  user: IUser | null;
  cards: ICardInputForm[];
  selectedCard: ICardInputForm | null;
  actions: IUserStoreActions;
}
