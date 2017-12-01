<template>
  <div>
    <span>How does one {{question.description}}?</span>
  </div>
</template>

<script>
// import _ from 'lodash';x

export default {
  name: 'Question',
  props:{
    question: {
      type: Object,
      required: true,
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
