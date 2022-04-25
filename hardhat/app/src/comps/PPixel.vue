<script setup>
import { defineProps, computed } from 'vue'
import { getHexColor, formatToShortAddress } from '@/helpers'

const props = defineProps({
  color: { type: Number, required: true },
  account: { type: String, required: true }
})

const tooltipText = (account) => {
  const shortAddress = formatToShortAddress(account)
  const emptyAddress = formatToShortAddress('0x0000000000000000000000000')

  return shortAddress !== emptyAddress ? `Owned by ${shortAddress}` : 'Be the first to own!'
}

const real = computed(() => getHexColor[props.color])
</script>

<template>
  <span class="artboard__pixel tooltip" :tip="tooltipText(account)"></span>
</template>

<style scoped>
  .artboard__pixel {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: v-bind(real);
  }

  .red .artboard__pixel:hover { background: red }
  .orange .artboard__pixel:hover { background: orange }
  .yellow .artboard__pixel:hover { background: yellow }
  .green .artboard__pixel:hover { background: green }
  .blue .artboard__pixel:hover { background: blue }
  .indigo .artboard__pixel:hover { background: indigo }
  .violet .artboard__pixel:hover { background: violet }
  .white .artboard__pixel:hover { background: white }
  .grey .artboard__pixel:hover { background: grey }
  .black .artboard__pixel:hover { background: black }
</style>
