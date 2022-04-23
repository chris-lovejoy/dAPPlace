<script setup>
import { ref, computed } from 'vue'

import CanvasComp from '@/comps/CanvasComp'
import ColorPicker from '@/comps/ColorPicker'
import CounterComp from '@/comps/CounterComp'

const color = ref('green')
const value = computed(() => {
  const TABLE = { green: 0, red: 1, blue: 2 }
  return TABLE[color.value]
})
</script>

<template>
<CounterComp />
<CanvasComp :value="value" />
<p> Color: {{ color }} </p>
<ColorPicker v-model="color" />
</template>
