<script setup>
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { ActionKey } from '../store/common';

const props = defineProps(['comicId']);

const store = useStore();
const isAddedToFavorite = ref(false);
const favoriteComics = computed(() => store.state.favoriteComics);

onMounted(() => {
  if (favoriteComics.value.find((favoriteComicId) => favoriteComicId === String(props.comicId))) {
    isAddedToFavorite.value = true;
  }
});

const onIconClick = () => {
  if (isAddedToFavorite.value) {
    store.dispatch(ActionKey.REMOVE_FAVORITE_COMIC, props.comicId);
  } else {
    store.dispatch(ActionKey.ADD_FAVORITE_COMIC, props.comicId);
  }
  isAddedToFavorite.value = !isAddedToFavorite.value;
};
</script>

<template>
    <div @click="onIconClick" class="add-favorite-button">
        <font-awesome-icon :class="[
            'add-favorite-button__favorite-icon',
            {'add-favorite-button__favorite-icon--active': isAddedToFavorite}
        ]"
        icon="fa-solid fa-heart"
        />
    </div>
</template>

<style lang="scss">
@import '/src/styles/colors';

.add-favorite-button {
    background-color: $cod-gray;
    border-radius: 2px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 2px;

    &__favorite-icon {
        color: white;

        &--active {
            color: $red-ribbon;
        }
    }
}
</style>
