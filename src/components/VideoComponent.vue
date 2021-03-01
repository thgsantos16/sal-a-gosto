<template>
  <div class="video">
    <div class="video-overlay" @click="closeVideo"></div>
    <div class="video-inner"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  methods: {
    closeVideo() {
      console.log(this);
    },
  },
});
</script>

<style lang="scss" scoped>

.video {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9990;

  .video-overlay {
    background-color: #00000077;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9991;
  }
}

</style>
