import {useLikeStore} from './like.store';

export const useLikeStoreActions = () => useLikeStore(state => state.actions);
