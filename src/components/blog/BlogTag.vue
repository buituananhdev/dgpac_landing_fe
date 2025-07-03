<template>
    <a href="#" :class="[
        'inline-block px-3 py-1 rounded-full text-sm font-medium transition-colors',
        active
            ? 'bg-[#962D33] text-white'
            : 'bg-[#E4E4E4] text-[#1D1D1B] hover:bg-[#C16063] hover:text-white'
    ]" @click.prevent="$emit('click')">
        #{{ name }}
    </a>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue';

interface Props {
    name: string;
    active?: boolean;
}

withDefaults(defineProps<Props>(), {
    active: false
});

defineEmits(['click']);
</script>