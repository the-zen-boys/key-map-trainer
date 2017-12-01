import Vue from 'vue';
import Question from '@/components/Question';

describe('Question.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Question);
    const vm = new Constructor().$mount({
      propsData: {
        question: { description: 'supertest' },
      },
    });

    expect(vm.question).to.equal({ description: 'supertest' });
    // expect(vm.$el.querySelector('.hello h1').textContent)
    // .to.equal('Welcome to Your Vue.js App');
  });
});
