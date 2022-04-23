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
  const tx = await canvas.set(x, y, props.value)
  await tx.wait()
  await updateGrid()
}
</script>

<template>
  <div class="container">
    <main>
      <div class="row" v-for="(_, y) in SIZE" :key="y">
        <template v-for="(_, x) in SIZE" :key="x">
          <PPixel :color="grid[(y * SIZE) + x].val" @click="click(x, y)" />
        </template>
      </div>
    </main>
  </div>
</template>

<style>
  div.container {
    margin: 0 auto;
    width: 200px;
    height: 200px;
    background: black;
    /* border: 5px solid #eee;
    border-radius: 5px; */
  }

  div.row {
    height: 20px;
  }

  span {
    width: 20px;
    height: 20px;
    display: inline-block;
  }
</style>
