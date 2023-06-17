import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart, faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import store from './store';
import router from './router';
import 'vue3-carousel/dist/carousel.css';
import 'primevue/resources/themes/md-dark-indigo/theme.css';
import 'primevue/resources/primevue.min.css';

library.add(faHeart, faBookBookmark);

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
