<script setup>
import { defineProps } from 'vue';

const props = defineProps(['onClick']);
</script>

<template>
    <button @click="props.onClick" class="app-button"><slot></slot></button>
</template>

<style lang="scss">
@import '/src/styles/mixins';
@import '/src/styles/colors';

.app-button {
    background-color: transparentize($color: white, $amount: 0.2);
    border: none;
    padding: 12px 30px;
    cursor: pointer;
    @include enable-animation(background-color);
    margin: 12px 0;
    font-weight: 600;
    font-size: 18px;
    user-select: none;
    color: $cod-gray;

    & > a {
        color: $cod-gray;
        text-decoration: none;
    }

    &:hover {
        background-color: white;
    }
}
</style>
