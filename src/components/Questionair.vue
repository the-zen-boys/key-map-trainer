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
import VisualStudioCodeKeyMap from '../assets/keymaps/visual-studio-code.json';
import Question from './Question';
import KeyInputListener from './KeyInputListener';

export default {
  name: 'Questionair',

  created() {
    const keyMapParser = new KeyMapParser();
    const questions = keyMapParser.parse(VisualStudioCodeKeyMap);

    this.questions = this.shuffle(questions);
  },

  data() {
    return {
      doShowAnswer: false,
      questionIndex: 0,
      questions: [],
    };
  },

  computed: {
    currentQuestion() {
      if (!this.questions || this.questions.length === 0) return undefined;
      return this.questions[this.questionIndex];
    }
  },

  methods: {
    _keyCombinationChanged(combination) {
      const isCorrect = this._isCorrectKeyCombination(this.currentQuestion.keys, combination);
      if (isCorrect) {
        console.log('Question is correct.');
        this.loadNextQuestion();
      }
    },

    _isCorrectKeyCombination (questionKeysCombi, pressedKeysCombi) {
      if (questionKeysCombi.length > pressedKeysCombi.length) return false;

      // Discard previous pressed key combination if question only requires one combination
      if (questionKeysCombi.length === 1 && pressedKeysCombi.length === 2) {
        pressedKeysCombi = [pressedKeysCombi[1]];
      }

      console.log(questionKeysCombi);
      console.log(pressedKeysCombi);

      for (let i = 0; i < questionKeysCombi.length; i++) {
        var questionKeys = questionKeysCombi[i];
        var pressedKeys = pressedKeysCombi[i];
        if (questionKeys.length !== pressedKeys.length) return false;
        if(!_.isEmpty(_.xor(questionKeys, pressedKeys))) return false;
      }
      
      return true;
    },

    loadNextQuestion () {
      if(this.questions.length-1 > this.questionIndex) {
        this.questionIndex++;
      } else {
        console.log('Questionair is complete, shuffle question list and restart.');
        // For now, just start over.
        this.questions = this.shuffle(this.questions);
        this.questionIndex = 0;
      }
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
