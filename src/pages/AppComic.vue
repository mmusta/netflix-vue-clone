<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import Skeleton from 'primevue/skeleton';
import { getImageUrl } from '../common';
import useComicQuery from '../hooks/api/useComicQuery';
import AppButton from '../components/AppButton.vue';
import { ActionKey } from '../store/common';

const props = defineProps(['comicId']);

const store = useStore();
const favoriteComics = computed(() => store.state.favoriteComics);
const { comic, isComicLoading } = useComicQuery({ comicId: props.comicId });
const isCurrentComicFavorite = computed(() => favoriteComics.value
  .find((favoriteComicId) => favoriteComicId === props.comicId));

const onFavoriteButtonClick = () => {
  if (isCurrentComicFavorite.value) {
    store.dispatch(ActionKey.REMOVE_FAVORITE_COMIC, props.comicId);
  } else {
    store.dispatch(ActionKey.ADD_FAVORITE_COMIC, props.comicId);
  }
};
</script>

<template>
    <section class="app-comic">
        <article v-if="isComicLoading" class="app-comic__skeleton-card" >
            <Skeleton width="26vw" height="80vh"></Skeleton>
            <div class="app-comic__skeleton-card-info-box">
                <div class="app-comic__skeleton-card-info">
                    <Skeleton width="32vw" height="10vh"></Skeleton>
                    <Skeleton width="42vw" height="4vh"></Skeleton>
                    <Skeleton width="52vw" height="18vh"></Skeleton>
                    <Skeleton width="52vw" height="10vh"></Skeleton>
                </div>
                <Skeleton width="52vw" height="8vh"></Skeleton>
            </div>
        </article>
        <article v-else class="app-comic__card">
            <img class="app-comic__card-image" :src="getImageUrl(comic?.thumbnail)" alt="Comic" />
            <div class="app-comic__card-info-box">
                <div class="app-comic__card-info">
                    <h2 class="app-comic__card-info-title">Comic Info</h2>
                    <span class="app-comic__card-info-item">
                        <label class="app-comic__card-info-item-label">
                            Title:&nbsp;
                        </label>
                        {{ comic?.title }}
                    </span>
                    <span class="app-comic__card-info-item">
                        <label class="app-comic__card-info-item-label">
                            Description:&nbsp;
                        </label>
                        <span v-html="comic?.description"></span>
                    </span>
                    <span class="app-comic__card-info-item">
                        <label class="app-comic__card-info-item-label">
                            Creators:&nbsp;
                        </label>
                        {{  comic?.creators.items.map(creator => creator.name).join(', ') }}
                    </span>
                </div>
                <AppButton :class="[
                    'app-comic__favorite-button',
                    { 'app-comic__favorite-button--favorite': isCurrentComicFavorite }
                ]" :on-click="onFavoriteButtonClick">{{
                    isCurrentComicFavorite
                        ? 'Remove From Favorite Comics'
                        : 'Add To Your Favorite Comics'
                }}</AppButton>
            </div>
        </article>
    </section>
</template>

<style lang="scss">
@import '/src/styles/colors';

.app-comic {
    margin-top: 32px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    &__card {
        display: flex;
        gap: 32px;
        width: 80vw;
    }

    &__card-image {
        height: 80vh;
    }

    &__card-info-title {
        font-size: 48px;
        margin: 0;
        margin-bottom: 24px;
        color: $jaffa;
    }

    &__card-info-item {
        font-size: 18px;
        display: block;
        margin: 16px 0;
    }

    &__card-info-item-label {
        font-weight: bold;
    }

    &__card-info-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    &__favorite-button {
        font-size: 20px;
        padding: 24px 0;
        background-color: transparentize($color: $red-ribbon, $amount: 0.2);
        color: white;

        &:hover {
            background-color: $red-ribbon;
            color: white;
        }

        &--favorite {
            background-color: transparentize($color: white, $amount: 0.2);
            color: $cod-gray;

            &:hover {
                background-color: white;
                color: $cod-gray;
            }
        }
    }

    &__skeleton-card {
       display: flex;
       gap: 32px;
    }

    &__skeleton-card-info-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    &__skeleton-card-info {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
}
</style>
