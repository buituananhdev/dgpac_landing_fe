<script setup lang="ts">
import { theme } from '@/theme'
import { ConfigProvider } from 'ant-design-vue'
import { MessageCircle, Minimize2, Send, X } from 'lucide-vue-next'
import { RouterView } from 'vue-router'

import DefaultLayout from '@/layouts/default.vue'
</script>

<template>
    <ConfigProvider :theme="{ token: { colorPrimary: '#962D33' } }">
        <DefaultLayout>
            <RouterView />
        </DefaultLayout>
    </ConfigProvider>
</template>

<style scoped>
html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Inter', sans-serif;
    color: #1D1D1B;
}
</style>
