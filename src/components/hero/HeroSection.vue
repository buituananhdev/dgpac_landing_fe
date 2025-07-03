<template>
    <section id="home" class="relative min-h-[80vh] md:min-h-[55vh] flex items-center bg-[#1D1D1B] text-white">
        <!-- Background Image with Overlay -->
        <div class="absolute inset-0 z-0 rounded-[16px]">
            <img src="/images/hero/hero_bg.png" alt="Hero Background" class="w-full h-full object-cover bg-bottom" />
        </div>

        <div class="container flex justify-center w-full relative">
        </div>

        <HeroQuote />

    </section>
</template>

<script setup lang="ts">
import HeroQuote from './HeroQuote.vue';
</script>

<style scoped>
</style>