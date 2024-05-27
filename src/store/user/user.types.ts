import { ICardForm } from 'types/card-types';

interface IUserStoreActions {
    addCard: (card: ICardForm) => void;
    removeCard: (id: string) => void;
    selectCard: (id: string | null) => void;
    reset: () => void;
}

export interface IUserStore {
    user: null | undefined;
    cards: ICardForm[];
    selectedCard: ICardForm | null;
    actions: IUserStoreActions;
}