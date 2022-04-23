<script setup>
import { ref, onMounted } from 'vue'

import { Greeter } from '@/contracts'

import CanvasComp from '@/comps/CanvasComp'
import CounterComp from '@/comps/CounterComp'

const greet = ref('nice')
onMounted(async () => (greet.value = await Greeter.greet()))
</script>

<template>
<p> Greet: {{ greet }} </p>
<CounterComp />
<CanvasComp />
</template>
