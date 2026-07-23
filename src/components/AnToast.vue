<template lang="pug">
.an-toast(:class="`${classes} ${active ? 'active' : ''}`" @click="hideToast()")
  i(:class="props.icon?.class")  {{ props.icon?.content }}
  span {{ message }}
  i(:class="props.closeIcon.class") {{ props.closeIcon.content }}
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import { eventService } from "../services/EventService";
import type { AnIcon, ToastParams, ToastType } from '../types';

const props = withDefaults(defineProps<{
  type: ToastType
  classes?: string
  icon?: AnIcon
  closeIcon?: AnIcon
}>(), {
  classes: 'an-toast-default an-toast-layout-default bottom',
  closeIcon: () => ({ content: 'X' })
})

const message = ref('')
const active = ref(false)
let timerId: number | null = null

const showToast = (toast: ToastParams) => {
  if (toast.type !== props.type) {
    return
  }
  if (active.value) {
    console.log(`there is currently another ${props.type}-toast visible`)
    return
  }
  message.value = toast.message || '';
  active.value = true
  timerId = window.setTimeout(hideToast, toast.duration)
}

const hideToast = () => {
  if (timerId) {
    window.clearTimeout(timerId)
    timerId = null
  }
  active.value = false
  message.value = ''
}

eventService.on(eventService.showToastKey, showToast);

</script>

<style lang="scss" scoped>

.an-toast-layout-default {
  border: 1px solid black;
  background-color: white;
  color: black;
  box-shadow: 10px 5px 5px gray;
  border-radius: 4px;
}

.an-toast-default {
  width: 80%;
  height: auto;
  padding: 16px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.an-toast {
  position: fixed;
  top: auto;
  bottom: 96px;
  left: 50%;
  right: auto;
  z-index: 200;
  visibility: hidden;
  opacity: 1;
  cursor: pointer;
  transform: translate(-50%);

  &.top {
    top: 96px;
    bottom: auto;
  }

  &.bottom {
    top: auto;
    bottom: 72px;
  }

  &.active {
    visibility: visible;
    animation: .2s toast-to-top;
  }

  &.active.top {
    visibility: visible;
    animation: .2s toast-to-bottom;
  }
}

@keyframes toast-to-top {
  0% {
    opacity: 0;
    transform: translate(-50%, 16px);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

@keyframes toast-to-bottom {
  0% {
    opacity: 0;
    transform: translate(-50%, -16px);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

@media only screen and (min-width: 993px) {
  .an-toast {
    width: 40%;
  }
}
</style>
