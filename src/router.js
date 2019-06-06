import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import rich from './views/Rich.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: rich,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/rich',
      name: 'rich',
      component: rich,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
