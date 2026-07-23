<template lang="pug">
.an-overlay(v-if="showOverlay" v-show="loaderVisible" ref="overlayRef" :class="{ 'overlay-visible': loaderVisible }")
.an-slider(ref="sliderRef" :class="{ 'slider-visible': loaderVisible }")
  .an-line(ref="lineRef")
  .an-subline.an-inc(ref="incRef")
  .an-subline.an-dec(ref="decRef")
</template>

<script lang="ts" setup>

import { ref, watchEffect } from 'vue'
import { eventService } from '../services/EventService';

const props = withDefaults(defineProps<{
  color?: string
  height?: number
  showOverlay?: boolean
  overlayOpacity?: number
}>(), {
  color: '#4a8df8',
  height: 2,
  showOverlay: true,
  overlayOpacity: 0.4
})

const loaderVisible = ref<Boolean>(false);
const overlayRef = ref()
const sliderRef = ref()
const lineRef = ref()
const incRef = ref()
const decRef = ref()

// Update CSS custom properties when props change
watchEffect(() => {
  if (overlayRef.value) {
    overlayRef.value.style.setProperty('--overlay-opacity', props.overlayOpacity.toString());
  }
  if (sliderRef.value) {
    sliderRef.value.style.setProperty('--loader-height', `${props.height}px`);
  }
  if (lineRef.value) {
    lineRef.value.style.setProperty('--loader-color', props.color);
    lineRef.value.style.setProperty('--loader-height', `${props.height}px`);
  }
  if (incRef.value) {
    incRef.value.style.setProperty('--loader-color', props.color);
    incRef.value.style.setProperty('--loader-height', `${props.height}px`);
  }
  if (decRef.value) {
    decRef.value.style.setProperty('--loader-color', props.color);
    decRef.value.style.setProperty('--loader-height', `${props.height}px`);
  }
})

let loadersRunning = 0;
const showLoader = (): void => {
  loadersRunning += 1
  if (loadersRunning === 1) {
    loaderVisible.value = true
  }
}
const hideLoader = (): void => {
  if (loadersRunning > 0) {
    loadersRunning -= 1
  }
  if (loadersRunning === 0) {
    loaderVisible.value = false
  }
}

eventService.on(eventService.showLoaderKey, showLoader)
eventService.on(eventService.hideLoaderKey, hideLoader)

</script>

<style lang="scss">

.an-overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 9998;
  background-color: rgba(0, 0, 0, var(--overlay-opacity, 0.4));
}

.an-slider {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-x: hidden;
  height: var(--loader-height, 2px);
  visibility: hidden;
  z-index: 9999;
  
  &.slider-visible {
    visibility: visible;
  }
}

.an-line {
  position: absolute;
  opacity: 0.4;
  background: var(--loader-color, #4a8df8);
  height: var(--loader-height, 2px);
  width: 150%;
}

.an-subline {
  position: absolute;
  background: var(--loader-color, #4a8df8);
  height: var(--loader-height, 2px);
}

.an-inc {
  animation: increase 2s infinite;
}

.an-dec {
  animation: decrease 2s 0.5s infinite;
}

@keyframes increase {
   from { left: -5%; width: 5%; }
   to { left: 130%; width: 100%;}
}
@keyframes decrease {
   from { left: -80%; width: 80%; }
   to { left: 110%; width: 10%;}
}

</style>
