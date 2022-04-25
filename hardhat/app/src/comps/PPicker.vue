<template>
  <ul class="color-picker">
    <li :tip="`Select red`" class="tooltip color-picker__item color-picker--red" @click="$emit('update:modelValue', 'red')"></li>
    <li :tip="`Select orange`" class="tooltip color-picker__item color-picker--orange" @click="$emit('update:modelValue', 'orange')"></li>
    <li :tip="`Select yellow`" class="tooltip color-picker__item color-picker--yellow" @click="$emit('update:modelValue', 'yellow')"></li>
    <li :tip="`Select green`" class="tooltip color-picker__item color-picker--green" @click="$emit('update:modelValue', 'green')"></li>
    <li :tip="`Select blue`" class="tooltip color-picker__item color-picker--blue" @click="$emit('update:modelValue', 'blue')"></li>
    <li :tip="`Select indigo`" class="tooltip color-picker__item color-picker--indigo" @click="$emit('update:modelValue', 'indigo')"></li>
    <li :tip="`Select violet`" class="tooltip color-picker__item color-picker--violet" @click="$emit('update:modelValue', 'violet')"></li>
    <li :tip="`Select white`" class="tooltip color-picker__item color-picker--white" @click="$emit('update:modelValue', 'white')"></li>
    <li :tip="`Select grey`" class="tooltip color-picker__item color-picker--grey" @click="$emit('update:modelValue', 'grey')"></li>
    <li :tip="`Select black`" class="tooltip color-picker__item color-picker--black" @click="$emit('update:modelValue', 'black')"></li>
  </ul>
</template>

<style scoped>
  .color-picker {
    padding: 0;
    height: 20px;
    margin-top: 20px;
  }

  .color-picker .color-picker__item {
    width: 20px;
    height: 20px;
    display: inline-block;
  }

  .color-picker--red { background-color: red; }
  .color-picker--orange { background-color: orange; }
  .color-picker--yellow { background-color: yellow; }
  .color-picker--green { background-color: green; }
  .color-picker--blue { background-color: blue; }
  .color-picker--indigo { background-color: indigo; }
  .color-picker--violet { background-color: violet; }
  .color-picker--white { background-color: white; }
  .color-picker--grey { background-color: grey; }
  .color-picker--black { background-color: black; }
</style>
