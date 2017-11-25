import Vue from 'vue';
import Router from 'vue-router';
import Question from '@/components/Question';
// import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Question',
      component: Question,
    },
  ],
});
