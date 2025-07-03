<template>
    <div class="tw-bg-white tw-rounded-lg tw-shadow-md tw-overflow-hidden tw-text-center tw-p-6">
        <div class="tw-aspect-square">
            <img :src="member.image" :alt="member.name" class="tw-w-full tw-h-full tw-object-cover" />
        </div>
        <h3 class="tw-text-2xl tw-font-bold tw-text-[#b44028] tw-mb-1">{{ member.name }}</h3>
        <div class="tw-w-12 tw-h-0.5 tw-bg-[#b44028] tw-mx-auto tw-mb-4"></div>
        <h4 class="tw-text-lg tw-font-semibold tw-text-[#1f2937] tw-mb-3">{{ member.role }}</h4>
        <p class="tw-text-sm tw-leading-relaxed tw-text-[#1f2937]">{{ member.description }}</p>
    </div>
</template>

<script setup lang="ts">
interface Member {
    name: string;
    role: string;
    description: string;
    image: string;
    delay?: string;
}

defineProps<{ member: Member; delay?: string }>();
</script>
