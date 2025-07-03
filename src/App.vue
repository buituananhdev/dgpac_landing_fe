<script setup lang="ts">
import AdminLayout from '@/layouts/admin.vue'
import DefaultLayout from '@/layouts/default.vue'
import { ConfigProvider } from 'ant-design-vue'
import { RouterView, useRoute } from 'vue-router'

const layouts: Record<string, typeof DefaultLayout> = {
    default: DefaultLayout,
    admin: AdminLayout
}

const layout = ref<typeof DefaultLayout | undefined>(DefaultLayout)
const route = useRoute()

watch(
    () => route.meta.layout as string | undefined,
    (layoutName: string | undefined) => {
        if (layoutName === '404') {
            layout.value = undefined
            return
        }
        layout.value = markRaw(layouts[layoutName || 'default'] ?? DefaultLayout)
    },
    { immediate: true }
)

</script>

<template>
    <ConfigProvider :theme="{ token: { colorPrimary: '#962D33' } }">
        <component :is="layout">
            <RouterView />
        </component>
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
