<template>
    <div class="relative cursor-pointer">
        <div class="relative h-auto rounded-lg overflow-hidden">
            <img :src="product.image" :alt="product.title" class="object-cover w-[66%] h-full" />

            <div class="absolute group w-max left-[78%] bottom-0 transform -translate-x-1/2 -translate-y-1/2 
                   bg-white hover:bg-[#b44028] 
                   text-black hover:text-white
                   p-6 shadow-medium
                   transition-all duration-300 md:w-[660px]">
                <h3 class="text-2xl font-bold mb-3 
                 text-[#b44028] group-hover:text-white 
                 transition-colors duration-300">
                    {{ product.title }}
                </h3>
                <p class="text-lg leading-relaxed mb-3">
                    {{ product.description }}
                </p>
                <button class="text-lg font-medium hover:underline 
                 transition-all duration-300 
                 text-white hidden group-hover:block">
                    See more&gt;&gt;&gt;
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    product: {
        image: string
        title: string
        description: string
    }
}>()
</script>
