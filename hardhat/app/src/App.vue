<script setup>
import { ref, computed } from 'vue'

import PCanvas from '@/comps/PCanvas'
import PPicker from '@/comps/PPicker'

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
  <header>
    Logo <button>Connect</button>
  </header>

  <PCanvas :value="value" />

  <p> Color: {{ color }} </p>
  <PPicker v-model="color" />
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
