import Vue from 'vue';
import Router from 'vue-router';
import Questionair from '@/components/Questionair';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Questionair',
      component: Questionair,
    },
  ],
});
