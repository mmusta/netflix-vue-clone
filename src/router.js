import { createRouter, createWebHistory } from 'vue-router';
import { appComicUrl, appHomeUrl } from './common/routeUrls';
import AppHome from './pages/AppHome.vue';
import AppComic from './pages/AppComic.vue';

const routes = [
  {
    path: appHomeUrl,
    component: AppHome,
  },
  {
    path: appComicUrl,
    component: AppComic,
    props: (route) => ({
      comicId: route.params.comicId,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
