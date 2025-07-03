<template>
    <BaseSection id="services" title="GUIDES" subtitle="" bgColor="white">
        <div class="space-y-0">
            <div v-for="section in sections" :key="section.id" class="section p-6 transition-colors duration-200"
                :class="isExpanded(section.id) ? 'bg-primary' : 'bg-white'">
                <!-- Section Header -->
                <button @click="toggleSection(section.id)"
                    class="w-full flex items-center justify-between p-0 text-left">
                    <h2 class="text-[28px] leading-8 font-semibold transition-colors duration-300"
                        :class="isExpanded(section.id) ? 'text-white' : 'text-dark'">
                        {{ section.title }}
                    </h2>
                    <div class="flex-shrink-0 ml-4">
                        <img :src="isExpanded(section.id) ? '/images/icons/minus.svg' : '/images/icons/plus.svg'"
                            alt="toggle" class="w-8 h-8 transition-opacity duration-200" />
                    </div>
                </button>

                <div class="content-wrapper overflow-hidden transition-all duration-500 ease-in-out"
                    :class="isExpanded(section.id) ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'">
                    <div class="content-inner" :ref="`content-${section.id}`">
                        <div class="pb-2">
                            <p v-for="(paragraph, index) in parseParagraphs(section.content)" :key="index"
                                class="text-white text-lg font-medium leading-relaxed mb-3 last:mb-0 transform transition-transform duration-300"
                                :class="isExpanded(section.id) ? 'translate-y-0' : 'translate-y-2'">
                                {{ paragraph }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BaseSection>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'

interface Section {
    id: string
    title: string
    content: string
}

const sections: Section[] = [
    {
        id: 'regulatory',
        title: '#Regulatory',
        content: 'Key regulations (IATA, IMDG, ADR)'
    },
    {
        id: 'bestpractice',
        title: '#BestPractice',
        content: 'How to pack DG, label requirements, declaration procedures.'
    },
    {
        id: 'commonmistakes',
        title: '#CommonMistakes',
        content: 'Real scenarios of DG mishandling\n\nHow proper packaging prevents risks'
    },
    {
        id: 'infographics',
        title: '#Infographics',
        content: 'Visual representation of DG classes or packing methods.'
    }
]

const expandedSections = ref<Set<string>>(new Set())

const toggleSection = async (id: string) => {
    const current = new Set(expandedSections.value)

    if (current.has(id)) {
        current.delete(id)
    } else {
        current.add(id)
    }

    expandedSections.value = current

    await nextTick()
}

const isExpanded = (id: string) => expandedSections.value.has(id)

const parseParagraphs = (text: string) => text.split('\n\n')
</script>

<style scoped>
.section {
    position: relative;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.04),
        0px 1px 2px rgba(16, 24, 40, 0.04);
    transition: background-color 0.3s ease-in-out;
}

.section::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 100%;
    background: linear-gradient(90deg, rgba(61, 61, 61, 0.28) 4.29%, rgba(146, 139, 139, 0.00) 100%);
}

.content-wrapper {
    will-change: max-height, opacity;
}

.content-inner {
    transform: translateZ(0);
}

.content-wrapper.max-h-0 {
    max-height: 0;
    margin-top: 0;
}

.content-wrapper.max-h-screen {
    max-height: 100vh;
}

.section {
    backface-visibility: hidden;
    perspective: 1000px;
}
</style>