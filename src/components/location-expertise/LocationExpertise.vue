<template>
    <BaseSection id="services" title="EXPERT ON LOCATION" subtitle="" bgColor="light">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-[12px] md:gap-[32px]">
            <div v-for="(image, index) in images" :key="index"
                class="overflow-hidden transition-all duration-300 bg-[rgba(0,0,0,0.2)] shadow-[0px_2px_6px_0px_rgba(16,24,40,0.08)] hover:shadow-none">
                <img :src="image.src" :alt="image.alt"
                    class="w-full h-full object-cover transition-all duration-300 brightness-75 hover:brightness-100 scale-[1.1]" />
            </div>
        </div>
    </BaseSection>
</template>

<script lang="ts" setup>
interface ImageItem {
    src: string
    alt: string
}

const images: ImageItem[] = [
    {
        src: '/images/location-expertise/localtion_expertise_1.png',
        alt: 'Industrial truck and equipment',
    },
    {
        src: '/images/location-expertise/localtion_expertise_2.png',
        alt: 'Delivery truck on location',
    },
    {
        src: '/images/location-expertise/localtion_expertise_3.png',
        alt: 'Expert consultation meeting',
    },
    {
        src: '/images/location-expertise/localtion_expertise_4.png',
        alt: 'Warehouse storage facility',
    },
    {
        src: '/images/location-expertise/localtion_expertise_5.png',
        alt: 'Hazardous materials storage',
    },
    {
        src: '/images/location-expertise/localtion_expertise_6.png',
        alt: 'Package handling and sorting',
    },
    {
        src: '/images/location-expertise/localtion_expertise_7.png',
        alt: 'Industrial warehouse operations',
    },
    {
        src: '/images/location-expertise/localtion_expertise_8.png',
        alt: 'Storage containers and logistics',
    },
]
</script>
