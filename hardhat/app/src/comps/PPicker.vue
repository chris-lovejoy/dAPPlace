<template>
  <ul>
    <li class="color color--red" @click="$emit('update:modelValue', 'red')"></li>
    <li class="color color--orange" @click="$emit('update:modelValue', 'orange')"></li>
    <li class="color color--yellow" @click="$emit('update:modelValue', 'yellow')"></li>
    <li class="color color--green" @click="$emit('update:modelValue', 'green')"></li>
    <li class="color color--blue" @click="$emit('update:modelValue', 'blue')"></li>
    <li class="color color--indigo" @click="$emit('update:modelValue', 'indigo')"></li>
    <li class="color color--violet" @click="$emit('update:modelValue', 'violet')"></li>
    <li class="color color--white" @click="$emit('update:modelValue', 'white')"></li>
    <li class="color color--grey" @click="$emit('update:modelValue', 'grey')"></li>
    <li class="color color--black" @click="$emit('update:modelValue', 'black')"></li>
  </ul>
</template>

<style>
  ul {
    margin: 18px 0 0 0;
    padding: 0;
  }

  ul li {
    list-style: none;
    width: 10px;
    height: 10px;
    display: inline-block;
  }

  .color {
    width: 20px;
    height: 20px;
    background-color: #ccc;
  }

  .color:focus {
    outline: 1px solid black;
  }

  .color--red { background-color: red; }
  .color--orange { background-color: orange; }
  .color--yellow { background-color: yellow; }
  .color--green { background-color: green; }
  .color--blue { background-color: blue; }
  .color--indigo { background-color: indigo; }
  .color--violet { background-color: violet; }
  .color--white { background-color: white; }
  .color--grey { background-color: grey; }
  .color--black { background-color: black; }
</style>
