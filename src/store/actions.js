import { ActionKey, MutationKey } from './common';

const actions = {
  [ActionKey.ADD_FAVORITE_COMIC]({ commit }, comicId) {
    commit(MutationKey.ADD_FAVORITE_COMIC, comicId);
  },
  [ActionKey.REMOVE_FAVORITE_COMIC]({ commit }, comicId) {
    commit(MutationKey.REMOVE_FAVORITE_COMIC, comicId);
  },
};

export default actions;
