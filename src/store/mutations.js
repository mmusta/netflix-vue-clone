import { MutationKey } from './common';

const mutations = {
  [MutationKey.ADD_FAVORITE_COMIC](state, comicId) {
    state.favoriteComics = [...state.favoriteComics, String(comicId)];
  },
  [MutationKey.REMOVE_FAVORITE_COMIC](state, comicId) {
    state.favoriteComics = state.favoriteComics.filter(
      (favoriteComicId) => favoriteComicId !== String(comicId),
    );
  },
};

export default mutations;
