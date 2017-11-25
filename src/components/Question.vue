<template>
  <div>
    <span>How does one {{currentQuestion.description}}?</span>
  </div>
</template>

<script>
// import _ from 'lodash';x

export default {
  name: 'Question',

  created() {
    // TODO fetch questions

    // Randomly sort questions
    if (this.questions && this.questions.length > 0) {
      this.currentQuestion = this.questions[0];
    }
  },

  data() {
    return {
      currentQuestion: {},
      questions: [{ codes: [12, 13], description: 'copy selection' }],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
