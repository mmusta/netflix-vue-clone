import { createStore } from 'vuex';
import actions from './actions';
import mutations from './mutations';

const store = createStore({
  state: {
    favoriteComics: [],
  },
  getters: {
    numberOfFavoriteComics(state) {
      return state.favoriteComics.length;
    },
  },
  mutations,
  actions,
});

export default store;
