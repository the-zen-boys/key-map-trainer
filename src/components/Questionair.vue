<template>
  <div>
    <question :question="currentQuestion"></question>
    <key-input-listener @key-combination-changed="_keyCombinationChanged"></key-input-listener>
  </div>
</template>

<script>
// import _ from 'lodash';
import Question from './Question';
import KeyInputListener from './KeyInputListener';

export default {
  name: 'Questionair',

  created() {
    // TODO fetch questions

    // Randomly sort questions
    if (this.questions && this.questions.length > 0) {
      this.currentQuestion = this.questions[0];
    }
  },

  data() {
    return {
      questions: [{ codes: [12, 13], description: 'copy selection' }],
    };
  },

  methods: {
    _keyCombinationChanged() { // combination
      // if (_.isEmpty(_.xor(combination, this.currentQuestion.codes))) {
      //   console.log('is equal');
      // }
    },
  },
  components: { Question, KeyInputListener },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
