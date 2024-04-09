<template>
  <div>{{ number }}</div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  value: {
    type: Number,
    default: 0
  }
})
const d = reactive({
  num: 0
})

function animateToValue() {
  gsap.to(d, {
    duration: 0.5,
    num: props.value
  })
}

animateToValue()

const number = computed(() => {
  if (Number.isInteger(d.num)) {
    return d.num.toFixed(0)
  }
  return d.num.toFixed(2)
})

watch(
  () => props.value,
  () => animateToValue()
)
</script>

<style scoped></style>
