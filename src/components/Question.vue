<template>
  <div>
    <key-input-listener @key-combination-changed="_keyCombinationChanged"></key-input-listener>
  </div>
</template>

<script>
import KeyInputListener from './KeyInputListener';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },

  methods: {
    _keyCombinationChanged(combination) {
      console.log(combination);
    },
  },
  components: { KeyInputListener },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
