<script setup>
import { onMounted, ref } from 'vue'

import { Canvas } from '@/contracts'
import { useEthers } from '@/compose'

const SIZE = 10

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

const selected = ref(50)

const click = async (x, y) => {
  const tx = await canvas.set(x, y, 1)
  await tx.wait()
  await updateGrid()
  selected.value = (y * SIZE) + x
}
</script>

<template>
<div>
  <input name="">
  <div v-for="(_, y) in SIZE" :key="y">
    <span v-for="(_, x) in SIZE" :key="x" @click="click(x, y)">
      {{ grid[(y * SIZE) + x].val }}
    </span>
  </div>
</div>
</template>
