<template>
    <Button :type="type" :size="size" :class="[
        'font-medium transition-all',
        type === 'primary' ? 'bg-[#962D33] hover:bg-[#B74E4C]' : '',
        className
    ]" v-bind="$attrs">
        <slot />
    </Button>
</template>

<script setup lang="ts">
import { Button } from 'ant-design-vue';
import { withDefaults } from 'vue';
defineOptions({
    inheritAttrs: false
});

interface Props {
    type?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
    size?: 'large' | 'middle' | 'small';
    className?: string;
}

withDefaults(defineProps<Props>(), {
    type: 'default',
    size: 'middle',
    className: ''
});
</script>