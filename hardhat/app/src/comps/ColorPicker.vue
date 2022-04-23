<template>
<div>
  <span @click="$emit('update:modelValue', 'red')"> Red </span>
  <span @click="$emit('update:modelValue', 'green')"> Green </span>
  <span @click="$emit('update:modelValue', 'blue')"> Blue </span>
</div>
</template>
