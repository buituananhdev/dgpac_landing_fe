<template>
    <div
        class="flex flex-col items-start text-left p-9 gap-6 flex-1 self-stretch border border-[#E5E7EB] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
        <div class="w-12 h-12">
            <img :src="iconPath" alt="" class="w-full h-full object-contain" />
        </div>

        <h3 class="text-[#1f2937] text-xl font-bold">{{ title }}</h3>
        <p class="text-[#1f2937] text-lg leading-relaxed">{{ text }}</p>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';

const props = defineProps<{
    icon: string,
    title: string,
    text: string,
}>()

const iconPath = computed(() => `/images/icons/${props.icon}.svg`);
</script>
