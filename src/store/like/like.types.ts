import {ICardProduct} from 'mock/SearchBarMock';

interface ILikeStoreActions {
  addLikedItem: (item: ICardProduct) => void;
  removeLikedItem: (id: number) => void;
  initialize: () => void;
  reset: () => void;
}

export interface ILikeStore {
  likedItems: ICardProduct[];
  actions: ILikeStoreActions;
}
