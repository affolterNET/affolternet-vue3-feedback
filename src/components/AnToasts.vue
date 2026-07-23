<template lang="pug">
an-toast(type="error" :classes="errorClasses" :icon="errorIcon" :close-icon="closeIcon")
an-toast(type="warning" :classes="warnClasses" :icon="warnIcon" :close-icon="closeIcon")
an-toast(type="info" :classes="infoClasses" :icon="infoIcon" :close-icon="closeIcon")
an-toast(type="done" :classes="doneClasses" :icon="doneIcon" :close-icon="closeIcon")
</template>

<script lang="ts" setup>

import type { AnIcon } from '../types';

defineProps<{
  closeIcon?: AnIcon
  errorClasses?: string
  errorIcon?: AnIcon
  warnClasses?: string
  warnIcon?: AnIcon
  infoClasses?: string
  infoIcon?: AnIcon
  doneClasses?: string
  doneIcon?: AnIcon
}>()

</script>

<style lang="scss">

</style>
