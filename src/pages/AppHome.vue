<script setup>
import { computed } from 'vue';
import { truncate } from 'lodash';
import Skeleton from 'primevue/skeleton';
import useComicsQuery from '../hooks/api/useComicsQuery';
import ComicsCarousel from '../components/ComicsCarousel.vue';
import AddFavoriteButton from '../components/AddFavoriteButton.vue';
import useComicQuery from '../hooks/api/useComicQuery';
import { HEADER_COMIC_ID, getImageUrl } from '../common';
import AppButton from '../components/AppButton.vue';

const { comics, isComicsLoading } = useComicsQuery();
const {
  comic: headerComic,
  isComicLoading: isHeaderComicLoading,
} = useComicQuery({ comicId: HEADER_COMIC_ID });
const headerImageSrc = computed(() => (headerComic.value
  ? getImageUrl(headerComic.value.thumbnail)
  : null));

const exclusiveComics = computed(() => comics.value?.slice(0, 10));
const topRatedComics = computed(() => comics.value?.slice(10, 20));
const mostReadComics = computed(() => comics.value?.slice(20, 30));
</script>

<template>
    <header class="home__header">
        <div v-if="isHeaderComicLoading">
            <Skeleton width="100vw" height="70vh"></Skeleton>
        </div>
        <div v-else class="home__header-image-box">
            <img
                class="home__header-image"
                v-bind="{ src: headerImageSrc }"
                alt="Comic"
            />
            <div class="home__header-image-gradient"></div>
            <div class="home__header-comic-info-box">
               <div class="home__header-comic-info">
                    <div class="home__header-comic-info-title-box">
                        <h1 class="home__header-comic-info-title">
                            {{ headerComic?.title  }}
                        </h1>
                        <AddFavoriteButton :comic-id="headerComic?.id" />
                    </div>
                    <div class="home__header-comic-info-buttons">
                        <AppButton>Read</AppButton>
                        <AppButton>My Comics</AppButton>
                    </div>
                    <p class="home__header-comic-info-description">
                        {{  truncate(headerComic?.description, {
                        length: 164
                        }) }}
                    </p>
               </div>
            </div>
        </div>
    </header>
    <div v-if="isComicsLoading" class="home__carousel-box-skeleton">
        <Skeleton width="120px" height="36px"></Skeleton>
        <div class="home__carousel-skeleton">
            <Skeleton width="15vw" height="40vh"></Skeleton>
            <Skeleton width="15vw" height="40vh"></Skeleton>
            <Skeleton width="15vw" height="40vh"></Skeleton>
            <Skeleton width="15vw" height="40vh"></Skeleton>
            <Skeleton width="15vw" height="40vh"></Skeleton>
        </div>
    </div>
    <ComicsCarousel v-else :comics="exclusiveComics" title="Exclusive" />
    <div v-if="isComicsLoading" class="home__carousel-box-skeleton">
        <Skeleton width="120px" height="36px"></Skeleton>
        <div class="home__carousel-skeleton">
            <Skeleton width="15vw" height="40vh"></Skeleton>
            <Skeleton width="15vw" height="40vh"></Skeleton>
            <Skeleton width="15vw" height="40vh"></Skeleton>
            <Skeleton width="15vw" height="40vh"></Skeleton>
            <Skeleton width="15vw" height="40vh"></Skeleton>
        </div>
    </div>
    <ComicsCarousel v-else :comics="topRatedComics" title="Top Rated" />
    <div v-if="isComicsLoading" class="home__carousel-box-skeleton">
        <Skeleton width="120px" height="36px"></Skeleton>
        <div class="home__carousel-skeleton">
            <Skeleton width="15vw" height="40vh"></Skeleton>
            <Skeleton width="15vw" height="40vh"></Skeleton>
            <Skeleton width="15vw" height="40vh"></Skeleton>
            <Skeleton width="15vw" height="40vh"></Skeleton>
            <Skeleton width="15vw" height="40vh"></Skeleton>
        </div>
    </div>
    <ComicsCarousel v-else :comics="mostReadComics" title="Most Read  " />
</template>

<style lang="scss">
@import '/src/styles/colors';

.home {
    &__header-image-box {
        position: relative;
    }

    &__header-image {
        width: 100%;
        position: relative;
        object-fit: cover;
        height: 70vh;
        object-position: 50% 52%;
    }

    &__header-image-gradient {
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(180deg, transparent, 82%, $cod-gray 95%);
        width: 100%;
        height: 100%;
    }

    &__header-comic-info-box {
        position: absolute;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        top: 0;
        margin: 32px;
        width: 36%;
    }
    &__header-comic-info {
        background-color: transparentize($color: $cod-gray, $amount: 0.4);
        padding: 24px;
        backdrop-filter: blur(6px);
    }

    &__header-comic-info-title {
        font-size: 36px;
        margin: 0;
        width: 80%;
    }

    &__header-comic-info-description {
        font-size: 14px;
    }

    &__header-comic-info-buttons {
        display: flex;
        gap: 12px;
    }

    &__header-comic-info-title-box {
        display: flex;
        justify-content: space-between;
    }

    &__carousel-box-skeleton {
        margin: 48px;
    }

    &__carousel-skeleton {
        display: flex;
        justify-content: space-between;
        margin: 24px;
    }
}
</style>
