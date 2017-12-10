<template>
  <div>
    <question :question="currentQuestion"></question>
    <button v-show="!doShowAnswer" v-on:click="showAnswer">Show me the answer</button>
    <p v-show="doShowAnswer">{{ currentQuestion.keysAsText }}</p>
    <key-input-listener @key-combination-changed="_keyCombinationChanged"></key-input-listener>
  </div>
</template>

<script>
// import _ from 'lodash';
import _ from 'lodash';
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
      currentQuestion: undefined,
      doShowAnswer: false,
      questions: [{
        description: 'copy selection',
        keys: [[12, 13], [14, 15]],
        keysAsText: '[ctrl] + c',
      }],
    };
  },

  methods: {
    _keyCombinationChanged(combination) {
      console.log(combination);
      console.log(this.currentQuestion.keys);
      if (_.isEmpty(_.xor(combination, this.currentQuestion.keys))) {
        console.log('is equal');
      }
      console.log('Is correct: ');
      const isCorrect = this._isCorrectKeyCombination(this.currentQuestion.keys, combination);
      console.log(isCorrect);
    },

    _isCorrectKeyCombination: function (questionKeysCombi, pressedKeysCombi) {
      if (questionKeysCombi.length !== pressedKeysCombi.length) return false;

      for (let i = 0; i < questionKeysCombi.length; i++) {
        var questionKeys = questionKeysCombi[i];
        var pressedKeys = pressedKeysCombi[i];
        if (questionKeys.length !== pressedKeys.length) return false;
        for(let j = 0; j < questionKeys.length; j++) {
          var questionKey = questionKeys[j];
          var pressedKey = pressedKeys[j];
          if (questionKey !== pressedKey) return false;
        }
      }
      
      return true;
    },

    showAnswer() {
      this.doShowAnswer = true;
    },

    shuffle(array) {
      let currentIndex = array.length;
      let temporaryValue;
      let randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex]; // eslint-disable-line no-param-reassign
        array[randomIndex] = temporaryValue; // eslint-disable-line no-param-reassign
      }

      return array;
    },
  },
  components: { Question, KeyInputListener },
  watch: {
    currentQuestion() {
      this.doShowAnswer = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
