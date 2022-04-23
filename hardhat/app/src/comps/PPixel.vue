<script setup>
import { defineProps, computed } from 'vue'

const TABLE = ['white', 'red', 'blue']

const props = defineProps({
  color: { type: Number, required: true }
})

const real = computed(() => TABLE[props.color])
</script>

<template>
<span></span>
</template>

<style scoped>
span {
  width: 20px;
  height:  20px;
  display: inline-block;
  background-color: v-bind(real);
  border-radius: 3px;
}
</style>
