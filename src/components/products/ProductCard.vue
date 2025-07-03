<template>
    <div class="relative cursor-pointer">
        <div class="relative h-auto rounded-lg">
            <img :src="product.image" :alt="product.title"
                class="object-cover w-full h-full transition-transform duration-500" />

            <div class="absolute group md:bottom-[-25%] bottom-0 left-0 max-w-[80%]
               bg-white hover:bg-[rgb(180,64,40)] 
               text-black hover:text-white
               p-4 shadow-medium 
               transition-all duration-300">
                <h3 class="text-2xl font-bold mb-2 
                 text-[#b44028] group-hover:text-white 
                 transition-colors duration-300">
                    {{ product.title }}
                </h3>
                <p class="text-lg leading-relaxed mb-2">
                    {{ product.description }}
                </p>

                <button class="text-lg font-medium mt-2 opacity-0 group-hover:opacity-100 
                 transition-opacity duration-300 hover:underline text-white hidden group-hover:block">
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
