import {ICardInputForm} from 'types/card-types';
import {IUser} from 'types/user';

interface IUserStoreActions {
  addCard: (card: ICardInputForm) => void;
  removeCard: (id: string) => void;
  selectCard: (id: string | null) => void;
  initialize: () => void;
  initUser: (user: IUser) => void;
  logout: () => void;
  reset: () => void;
}

export interface IUserStore {
  user: IUser | null | undefined;
  cards: ICardInputForm[];
  selectedCard: ICardInputForm | null;
  actions: IUserStoreActions;
}
