<template>
    <div class="relative group cursor-pointer overflow-hidden md:max-w-[350px] h-[430px]" style="
      box-shadow:
        0px 8px 24px -3px rgba(16, 24, 40, 0.05),
        0px 8px 24px -3px rgba(16, 24, 40, 0.10);
    ">
        <div class="relative w-full h-full">
            <div class="absolute inset-0 z-10" :style="`
          background:
            linear-gradient(0deg, #B44028 0%, rgba(151, 54, 33, 0.71) 12.5%, rgba(78, 28, 17, 0.00) 32.69%),
            url('${project.image}') lightgray 50% / cover no-repeat;
        `" :alt="project.alt"></div>

            <!-- Overlay khi hover -->
            <div
                class="absolute inset-0 z-20 bg-[#b44028]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>

            <!-- Nội dung mặc định -->
            <div class="absolute bottom-0 left-0 right-0 z-30 p-4 
               group-hover:opacity-0 transition-opacity duration-300">
                <p class="text-white text-sm mb-1">{{ project.date }}</p>
                <h3 class="text-white text-[28px] font-semibold">{{ project.title }}</h3>
            </div>

            <!-- Nội dung hover -->
            <div class="absolute h-full inset-0 z-30 p-6 flex flex-col justify-between
  opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0
  transition-all duration-500 ease-in-out">
                <div class="h-full flex flex-col justify-between">
                    <p class="text-white text-sm mb-2">{{ project.date }}</p>
                    <h3 class="text-white text-[28px] font-semibold">{{ project.title }}</h3>
                    <p class="text-white text-lg leading-7 h-full">
                        {{ project.description }}
                    </p>
                </div>
                <div class="mt-4">
                    <span class="text-white text-xl font-medium hover:underline">
                        See more&gt;&gt;&gt;
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    project: {
        title: string
        date: string
        image: string
        alt: string
        description: string
    }
}>()
</script>
