<script setup>
import { ref, onMounted } from 'vue'

import { useEthers } from '@/compose'
import { Counter } from '@/contracts'

const ethers = useEthers()
const signer = ethers.getSigner()
const counter = Counter.connect(signer)

const count = ref(0)
onMounted(async () => (count.value = await Counter.get()))

const add = async () => {
  const tx = await counter.add()
  await tx.wait()
  count.value = await counter.get()
}
</script>

<template>
<div>
  <p> Count: {{ count }} </p>
  <p>
    <button @click="add"> Add </button>
  </p>
</div>
</template>
