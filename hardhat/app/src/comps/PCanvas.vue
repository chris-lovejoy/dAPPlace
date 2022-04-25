<script setup>
import { onMounted, defineProps, ref } from 'vue'

import { useIntervalFn } from '@vueuse/core'

import PPixel from '@/comps/PPixel'

import { Canvas } from '@/contracts'
import { useEthers } from '@/compose'

const SIZE = 10

const props = defineProps(['value'])

const ethers = useEthers()
const signer = ethers.getSigner()
const canvas = Canvas.connect(signer)

const placeholder = []
for (let i = 0; i < 100; i++) {
  placeholder.push({ val: 0, acc: 0 })
}

const grid = ref(placeholder)
const updateGrid = async () => (grid.value = await Canvas.pixels())
onMounted(updateGrid)
useIntervalFn(updateGrid, 1000)

const click = async (x, y) => {
  let accounts
  accounts = await window.ethereum.request({ method: 'eth_accounts' })

  if (accounts.length === 0) {
    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  const tx = await canvas.set(x, y, props.value)
  await tx.wait()
  await updateGrid()
}
</script>

<template>
  <div class="artboard__row" v-for="(_, y) in SIZE" :key="y">
    <template v-for="(_, x) in SIZE" :key="x">
      <PPixel
        :color="grid[(y * SIZE) + x].val" @click="click(x, y)"
        :account="`${grid[(y * SIZE) + x].acc}`"
      />
    </template>
  </div>
</template>

<style>
  .artboard__row {
    height: 20px;
  }

  .tooltip:hover {
    z-index:1;
    color:#8325f7;
    position:relative;
  }

  .tooltip:after {
    content: attr(tip);
    font-size: 90%;
    line-height: 1.2em;
    color: #000;
    padding: 5px 10px;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    background: #ddd;
    position: absolute;
    top: -2px;
    left: 25px;
    display: none;
    white-space: nowrap;
    opacity: 75%;
  }

  .tooltip:hover:after {
    display:block;
  }
</style>
