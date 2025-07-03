<template>
    <section :id="id" :class="[
        'py-8 md:py-16',
        bgColor === 'light' ? 'bg-[#F1F5F9]' : '',
        bgColor === 'dark' ? 'bg-[rgba(0, 0, 0, 0.01)]' : '',
        bgColor === 'white' ? 'bg-white' : '',
        className
    ]" :data-aos="animation">
        <div class="container mx-auto">
            <div v-if="title || subtitle" class="text-center mb-16">
                <h2 v-if="title" class="section-title text-[32px] font-[600] mb-2"
                    :class="bgColor === 'dark' ? 'text-white' : 'text-primary'">{{ title }}</h2>
                <BaseDivider v-if="title" :color="bgColor === 'dark' ? 'white' : 'primary'" />
                <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
            </div>
            <slot />
        </div>
    </section>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue';

interface Props {
    id?: string;
    title?: string;
    subtitle?: string;
    bgColor?: 'light' | 'dark' | 'white';
    className?: string;
    animation?: string;
}

withDefaults(defineProps<Props>(), {
    id: '',
    title: '',
    subtitle: '',
    bgColor: 'white',
    className: '',
    animation: 'fade-up'
});
</script>
