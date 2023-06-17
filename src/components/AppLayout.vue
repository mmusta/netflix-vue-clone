<script setup>
import {
  onMounted, onUnmounted, ref,
  computed,
} from 'vue';
import { useStore } from 'vuex';
import {
  getImageResource, ImageExtension,
} from '../common/index';
import { appHomeUrl } from '../common/routeUrls';

const store = useStore();
const hasDocumentScrolled = ref(false);
const numberOfFavoriteComics = computed(() => store.getters.numberOfFavoriteComics);

const onWindowScroll = () => {
  hasDocumentScrolled.value = document.documentElement.scrollTop !== 0;
};

onMounted(() => {
  window.addEventListener('scroll', onWindowScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onWindowScroll);
});
</script>

<template>
    <section class="app-layout">
        <nav :class="[
            'app-layout__navigation',
             { 'app-layout__navigation--scrolled': hasDocumentScrolled }
        ]">
            <router-link :to="appHomeUrl">
                <img
                    class="app-layout__marvel-logo"
                    v-bind="{ src: getImageResource({
                        imageName: 'marvel-comics-logo',
                        extension: ImageExtension.WEBP
                    })}"
                    alt="Marvel Comics Logo"
                />
            </router-link>
            <div class="app-layout__user-avatar-box">
                <div class="app-layout__user-avatar">
                    <font-awesome-icon
                        class="app-layout__user-avatar-icon"
                        icon="fa-solid fa-book-bookmark"
                    >
                    </font-awesome-icon>
                </div>
                <div class="app-layout__number-of-favorite-comics-badge">
                    {{ numberOfFavoriteComics }}
                </div>
            </div>
        </nav>
        <router-view></router-view>
        <footer class="app-layout__footer">Created With <a class="app-layout__footer-link" target="_blank" href="https://vuejs.org/">@VueJS</a></footer>
    </section>
</template>

<style lang="scss">
@import '/src/styles/colors';
@import '/src/styles/mixins';

.app-layout {
    background-color: $cod-gray;
    color: white;

    &__navigation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        position: fixed;
        z-index: 1;
        top: 0;
        width: 100%;
        background-color: transparent;
        @include enable-animation(background-color);

        &--scrolled {
            background-color: $cod-gray;
        }
    }

    &__marvel-logo {
        height: 48px;
        object-fit: contain;
    }

    &__user-avatar {
        height: 40px;
        width: 40px;
        padding: 4px;
        background-color: $jaffa;
        border-radius: 2px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__user-avatar-icon {
        color: transparentize($color: white, $amount: 0.1);
        font-size: 12px;
    }

    &__user-avatar-box {
        position: relative;
    }

    &__number-of-favorite-comics-badge {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 22px;
        height: 22px;
        bottom: -8px;
        left: -8px;
        border-radius: 99px;
        background-color: $red-ribbon;
        font-size: 14px;
    }

    &__footer {
        display: flex;
        justify-content: center;
        padding: 32px 0 18px;
        font-size: 16px;
    }

    &__footer-link {
        color: $ocean-green;
        font-weight: bold;
        text-decoration: none;
        margin-left: 6px;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
