<template>
  <div></div>
</template>

<script>
export default {
  name: 'keyInputListener',
  data() {
    return {
      keysDown: {},
      previousCombination: {},
    };
  },
  created() {
    window.addEventListener('keydown', (event) => {
      if (!this.keysDown[event.key]) {
        this.keysDown[event.key] = event.keyCode;
        this.$emit('key-combination-changed', this.keysDown);
      }
    });

    window.addEventListener('keyup', (event) => {
      delete this.keysDown[event.key];
      // if (Object.keys(this.keysDown).length === 0 && this.keysDown.constructor === Object) {

      // }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
