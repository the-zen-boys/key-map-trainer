<template>
  <div>
    <question :question="currentQuestion"></question>
    <key-input-listener @key-combination-changed="_keyCombinationChanged"></key-input-listener>
  </div>
</template>

<script>
// import _ from 'lodash';
import KeyMapParser from '../libs/key-map-parser';
import template from '../assets/keymaps/template.json';
import Question from './Question';
import KeyInputListener from './KeyInputListener';

export default {
  name: 'Questionair',

  created() {
    const keyMapParser = new KeyMapParser();
    const questions = keyMapParser.parse(template);

    this.questions = this.shuffle(questions);

    if (this.questions && this.questions.length > 0) {
      this.currentQuestion = this.questions[0];
    }
  },

  data() {
    return {
      questions: [{ keys: [[12, 13], [14, 15]], description: 'copy selection' }]
    };
  },

  methods: {
    _keyCombinationChanged(combination) {
      console.log('comparing');
      console.log(this.currentQuestion.keys);
      console.log(combination);
      if (_.isEmpty(_.xor(combination, this.currentQuestion.keys))) {
        console.log('is equal');
      }
    },

    shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
  },
  components: { Question, KeyInputListener }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
