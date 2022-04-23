<script setup>
import { defineProps, computed } from 'vue'

const TABLE = ['#ddd', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white', 'grey', 'black']

const props = defineProps({
  color: { type: Number, required: true }
})

const real = computed(() => TABLE[props.color])
</script>

<template>
  <span class="color-picker"></span>
</template>

<style scoped>

  span {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: v-bind(real);
  }
</style>
