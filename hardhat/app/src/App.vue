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
  <div :class="{[color]: true}">
    <PCanvas :value="value" />
    <PPicker v-model="color" />
  </div>
</template>

<style>
  body {
    margin: 0;
    font-family: monospace;
    background-color: #fff;
  }

  .app {
    width: 200px;
    height: 250px;

    position: absolute;
    top: 50%;
    left:50%;
    margin: -125px 0 0 -100px;
  }

  header {
    display:flex;
    justify-content: space-between;
    background: rgb(59 130 246);
    padding: 15px 15px 15px 15px;
    margin-bottom: 30px;
    color: #fff;
    font-size: 16px;
    align-items: center;
  }

  button {
    color: rgb(59 130 246);
    background-color: white;
    border: none;
    border-radius: 5px;
    padding: 6px 8px;
  }

  .selected-color {
    margin-top: 20px;
    text-align: center;
  }

  .red .color-picker:hover { background-color: red; opacity:1;}
  .orange .color-picker:hover { background-color: orange; opacity:1;}
  .yellow .color-picker:hover { background-color: yellow; opacity:1;}
  .green .color-picker:hover { background-color: green; opacity:1;}
  .blue .color-picker:hover { background-color: blue; opacity:1;}
  .indigo .color-picker:hover { background-color: indigo; opacity:1;}
  .violet .color-picker:hover { background-color: violet; opacity:1;}
  .white .color-picker:hover { background-color: white; opacity:1;}
  .grey .color-picker:hover { background-color: grey; opacity:1;}
  .black .color-picker:hover { background-color: black; opacity:1;}
</style>
