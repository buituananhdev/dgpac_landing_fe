<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';

</script>

<template>
    <AppHeader />
    <slot />
    <div class="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <a href="tel:+123456789"
            class="bg-[#962D33] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-[#B74E4C] transition-colors">
            <PhoneOutlined class="text-xl" />
        </a>
        <a href="#contact"
            class="bg-[#962D33] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-[#B74E4C] transition-colors">
            <MessageOutlined class="text-xl" />
        </a>
    </div>
</template>

<style lang="less" scoped></style>
