<script setup>
import { defineProps, computed } from 'vue'

const TABLE = ['#ddd', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white', 'grey', 'black']

const props = defineProps({
  color: { type: Number, required: true },
  acc: { type: Number, required: true }
})

const real = computed(() => TABLE[props.color])
</script>

<template>
  <span class="color-picker" tip="Address goes here"></span>
</template>

<style scoped>

  .color-picker {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: v-bind(real);
  }

  .color-picker:hover {
    opacity: 0.75;
  }

  .color-picker:after {
    content: attr(tip);
    font-size:90%;
    line-height:1.2em;
    color:#000;
    /* width:200px; */
    padding:5px 10px;
    -moz-border-radius:6px;
    -webkit-border-radius:6px;
    border-radius:6px;
    background:#ddd;
    /*
    background:-webkit-linear-gradient(#ddd, #fff);
    background:-moz-linear-gradient(#ddd, #fff);
    background:-o-linear-gradient(#ddd, #fff);
    background:-ms-linear-gradient(#ddd, #fff);
    background:linear-gradient(#ddd, #fff);
    -moz-box-shadow: 3px 3px 4px rgba(0,0,0, .65);
    -webkit-box-shadow: 3px 3px 4px rgba(0,0,0, .65);
    box-shadow: 3px 3px 4px rgba(0,0,0, .65);
    */
    position:absolute;
    top:-2px;
    left:25px;
    display:none;
    white-space: nowrap;
  }

  .color-picker:before {
    z-index:1000;
    position:absolute;
    content:"";
    top:15px;
    left:0px;
    border-right:7px transparent solid;
    border-left:7px transparent solid;
    display:none;
  }

  .color-picker:hover {
    z-index:1000;
    position:relative;
    color:#8325f7;
  }

  .color-picker:hover:after {
    display:block;
  }

  .color-picker:hover:before {
    display:block;
  }

</style>
