<template>
  <div>
    <span v-for="(item, index) in keysDown" v-bind:key="item.keyCode">
      {{item.key}}<span v-if="(index + 1) !== keysDown.length">+</span>
    </span>

    <h2>Combination:</h2>
    <span v-for="(item, index) in previousCombination" v-bind:key="item.keyCode">
      {{item.key}}<span v-if="(index + 1) !== previousCombination.length">+</span>
    </span>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'keyInputListener',
  data() {
    return {
      keysPressed: 0,
      keysDown: [],
      previousCombination: [],
    };
  },

  created() {
    window.addEventListener('keydown', (event) => {
      const keyDown = _.find(this.keysDown, { key: event.key });
      if (!keyDown) {
        this.keysDown.push({ key: event.key, keyCode: event.keyCode });
        const keyCombinations = this.getKeyCombinations();
        this.$emit('key-combination-changed', keyCombinations);
        this.keysPressed += 1;
      }

      this.disabledEventPropagation(event);
      event.preventDefault();
    });

    window.addEventListener('keyup', (event) => {
      this.keysPressed -= 1;
      if (this.keysPressed === 0) {
        this.previousCombination = _.clone(this.keysDown);
        this.keysDown = [];
      }

      this.disabledEventPropagation(event);
      event.preventDefault();
    });
  },

  methods: {
    disabledEventPropagation(e) {
      if (e) {
        if (e.stopPropagation) {
          e.stopPropagation();
        } else if (window.event) {
          window.event.cancelBubble = true;
        }
      }
    },

    getKeyCombinations() {
      return [
        this.previousCombination.map(item => item.keyCode),
        this.keysDown.map(item => item.keyCode),
      ];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
