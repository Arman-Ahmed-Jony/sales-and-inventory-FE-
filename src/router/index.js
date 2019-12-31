import Vue from 'vue';
import VueRouter from 'vue-router';
import { LocalStorage } from 'quasar';
import { routes } from '../modules';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function () {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  Router.beforeEach((to, from, next) => {
    const noAuthRequired = to.matched.some(record => record.meta.noAuthRequired);
    // console.log(LocalStorage.getItem('isAuthenticated'))
    const isAuthenticated = LocalStorage.has('isAuthenticated') ? LocalStorage.getItem('isAuthenticated') : null;
    // let isAuthenticated = LocalStorage.getItem('isAuthenticated')
    // when route requires auth and there's no current user, reidrect to '/login'
    if (!noAuthRequired && isAuthenticated === null) {
      next('/auth');
      // when we go to login route and are already logged in, we can skip this page
      // so we redirect to the homepage
    } else if (to.path === '/auth' && isAuthenticated) {
      next('/');

      // if none of the above matches, we have a normal navigation that should just go through
      // so we call `next()`
    } else if (to.path === '/administration' && isAuthenticated.data.data.type !== 'ADMIN') {
      next('/');
    } else if (to.path === '/report' && isAuthenticated.data.data.type !== 'ADMIN') {
      next('/');
    } else if (to.path === '/users' && isAuthenticated.data.data.type !== 'ADMIN') {
      next('/');
    } else {
      next();
    }
  });

  return Router;
}
