<template>
    <Card :bordered="bordered" :hoverable="hoverable" :class="[
        'h-full transition-all duration-300',
        hoverable ? 'hover:shadow-lg hover:translate-y-[-5px]' : '',
        className
    ]" :data-aos="animation">
        <slot />
    </Card>
</template>

<script setup lang="ts">
import { Card } from 'ant-design-vue';
import { withDefaults } from 'vue';
defineOptions({
    inheritAttrs: false
});

interface Props {
    bordered?: boolean;
    hoverable?: boolean;
    className?: string;
    animation?: string;
}

withDefaults(defineProps<Props>(), {
    bordered: true,
    hoverable: true,
    className: '',
    animation: 'fade-up'
});
</script>