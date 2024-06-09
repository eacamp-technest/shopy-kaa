import {ICardInputForm} from 'types/card-types';

interface IUserStoreActions {
  addCard: (card: ICardInputForm) => void;
  removeCard: (id: string) => void;
  selectCard: (id: string) => void;
  reset: () => void;
}

export interface IUserStore {
  user: null | undefined;
  cards: ICardInputForm[];
  selectedCard: ICardInputForm | null;
  actions: IUserStoreActions;
}
