<script setup>
import { defineProps } from 'vue';
import {
  Carousel, Slide, Pagination, Navigation,
} from 'vue3-carousel';
import { generatePath, getImageUrl } from '../common/index';
import { appComicUrl } from '../common/routeUrls';
import AppButton from './AppButton.vue';
import AddFavoriteButton from './AddFavoriteButton.vue';

const props = defineProps(['comics', 'title']);

</script>

<template>
    <article class="comics-carousel">
        <h2 class="comics-carousel__title">{{ props.title }}</h2>
        <Carousel :items-to-show="5">
            <Slide v-for="comic in props.comics" :key="comic.id">
                <div class="comics-carousel__slide">
                    <img
                        class="comics-carousel__slide-image"
                        v-bind="{ src: getImageUrl(comic?.thumbnail) }"
                        alt="Slide Comic"
                    />
                    <div class="comics-carousel__slide-read-comic-box">
                        <AppButton class="comics-carousel__slide-read-comic">
                        <router-link :to="generatePath(appComicUrl, {
                            comicId: comic.id
                        })">
                            Read Comic
                        </router-link>
                    </AppButton>
                    </div>
                    <AddFavoriteButton
                        :comic-id="comic?.id"
                        class="comics-carousel__slide-add-favorite-button"
                    />
                </div>
            </Slide>
            <template #addons>
                <Navigation />
                <Pagination />
            </template>
        </Carousel>
    </article>
</template>

<style lang="scss">
@import '/src/styles/mixins';

.comics-carousel {
    margin: 12px 48px 48px;

    .carousel__prev {
        left: -32px;
    }

    .carousel__next {
        right: -32px;
    }

    .carousel__pagination-button::after {
        background-color: transparentize($color: white, $amount: 0.9);
    }

    .carousel__pagination-button:hover::after, .carousel__pagination-button--active::after {
        background-color: white;
    }

    .carousel__icon {
        color: white;
        transform: scale(1.5);
    }

    &__title {
        margin: 0;
    }

    &__slide-image {
        width: 15vw;
    }

    &__slide {
        position: relative;
        @include enable-animation;

        &:hover {
            transform: scale(1.1);
        }
    }

    &__slide-read-comic-box {
        position: absolute;
        bottom: 16px;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    &__slide-add-favorite-button {
        position: absolute;
        top: 12px;
        right: 12px;
    }
}
</style>
