<template>
    <div class="w-[50px] h-[2px] mx-auto mt-3 mb-3" :class="colorClass"></div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';

const props = defineProps<{
    color?: string
}>()

const colorClass = computed(() => {
    return props.color ? `bg-${props.color}` : 'bg-primary'
})
</script>
