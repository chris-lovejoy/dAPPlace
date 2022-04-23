<script setup>
import { ref, computed } from 'vue'

import CanvasComp from '@/comps/CanvasComp'
import ColorPicker from '@/comps/ColorPicker'
// import CounterComp from '@/comps/CounterComp'

const color = ref('green')
const value = computed(() => {
  const TABLE = {
    white: 0,
    red: 1,
    orange: 2,
    yellow: 3,
    green: 4,
    blue: 5,
    indigo: 6,
    violet: 7
  }
  return TABLE[color.value]
})
</script>

<template>
  <!-- <CounterComp /> -->
  <header>
    Logo
    <button>Connect</button>
  </header>
  <CanvasComp :value="value" />
  <p> Color: {{ color }} </p>
  <ColorPicker v-model="color" />
</template>

<style>
  body {
    margin: 0;
  }

  header {
    display:flex;
    justify-content: space-between;
    background: rgb(59 130 246);
    padding: 10px;
    margin-bottom: 30px;
  }
</style>
