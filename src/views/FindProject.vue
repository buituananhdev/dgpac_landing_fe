<template>
    <div class="min-h-screen bg-[#f1f5f9] relative">
        <!-- Main Content -->
        <div class="flex max-w-7xl mx-auto px-8 py-8 gap-8 relative z-20">
            <!-- Sidebar -->
            <div class="w-80 bg-[#ffffff] rounded-lg p-6 h-fit">
                <!-- Back Button -->
                <Button type="text" class="mb-6 p-2 h-auto">
                    <template #icon>
                        <ArrowLeftOutlined class="text-[#b44028]" />
                    </template>
                </Button>

                <!-- Filters -->
                <div class="space-y-6">
                    <div class="flex items-center justify-between">
                        <h2 class="text-[#b44028] text-xl font-semibold">Filters</h2>
                        <button class="text-[#6b7280] text-sm hover:text-[#1f2937]">Clear All</button>
                    </div>

                    <!-- Project Filter -->
                    <div>
                        <button @click="toggleSection('project')"
                            class="flex items-center justify-between w-full text-left">
                            <h3 class="text-[#1f2937] font-medium">Project</h3>
                            <DownOutlined :class="[
                                'w-4 h-4 transition-transform',
                                expandedSections.project ? 'rotate-180' : ''
                            ]" />
                        </button>
                        <div v-show="expandedSections.project" class="mt-3 space-y-3">
                            <div class="flex items-center space-x-2">
                                <Checkbox v-model:checked="filters.project.all" class="custom-checkbox">
                                    All
                                </Checkbox>
                            </div>
                            <div class="flex items-center space-x-2">
                                <Checkbox v-model:checked="filters.project.aircraft" class="custom-checkbox">
                                    Aircraft Spare Parts
                                </Checkbox>
                            </div>
                            <div class="flex items-center space-x-2">
                                <Checkbox v-model:checked="filters.project.chemicals" class="custom-checkbox">
                                    Chemicals
                                </Checkbox>
                            </div>
                            <div class="flex items-center space-x-2">
                                <Checkbox v-model:checked="filters.project.ink" class="custom-checkbox">
                                    Ink
                                </Checkbox>
                            </div>
                        </div>
                    </div>

                    <!-- Origin Filter -->
                    <div>
                        <button @click="toggleSection('origin')"
                            class="flex items-center justify-between w-full text-left">
                            <h3 class="text-[#1f2937] font-medium">Origin</h3>
                            <DownOutlined :class="[
                                'w-4 h-4 transition-transform',
                                expandedSections.origin ? 'rotate-180' : ''
                            ]" />
                        </button>
                        <div v-show="expandedSections.origin" class="mt-3 space-y-3">
                            <div class="flex items-center space-x-2">
                                <Checkbox v-model:checked="filters.origin.all" class="custom-checkbox">
                                    All
                                </Checkbox>
                            </div>
                            <div class="flex items-center space-x-2">
                                <Checkbox v-model:checked="filters.origin.uk" class="custom-checkbox">
                                    United Kingdom
                                </Checkbox>
                            </div>
                            <div class="flex items-center space-x-2">
                                <Checkbox v-model:checked="filters.origin.japan" class="custom-checkbox">
                                    Japan
                                </Checkbox>
                            </div>
                            <div class="flex items-center space-x-2">
                                <Checkbox v-model:checked="filters.origin.vietnam" class="custom-checkbox">
                                    Vietnam
                                </Checkbox>
                            </div>
                            <div class="flex items-center space-x-2">
                                <Checkbox v-model:checked="filters.origin.korea" class="custom-checkbox">
                                    Korea
                                </Checkbox>
                            </div>
                            <div class="flex items-center space-x-2">
                                <Checkbox v-model:checked="filters.origin.italy" class="custom-checkbox">
                                    Italy
                                </Checkbox>
                            </div>
                        </div>
                    </div>

                    <!-- Industry Filter 1 -->
                    <div>
                        <button @click="toggleSection('industry1')"
                            class="flex items-center justify-between w-full text-left">
                            <h3 class="text-[#1f2937] font-medium">Industry</h3>
                            <DownOutlined :class="[
                                'w-4 h-4 transition-transform',
                                expandedSections.industry1 ? 'rotate-180' : ''
                            ]" />
                        </button>
                        <div v-show="expandedSections.industry1" class="mt-3 space-y-3">
                            <div class="flex items-center space-x-2">
                                <Checkbox v-model:checked="filters.industry1.all" class="custom-checkbox">
                                    All
                                </Checkbox>
                            </div>
                            <div class="flex items-center space-x-2">
                                <Checkbox v-model:checked="filters.industry1.aerospace" class="custom-checkbox">
                                    Aerospace & Aviation
                                </Checkbox>
                            </div>
                            <div class="flex items-center space-x-2">
                                <Checkbox v-model:checked="filters.industry1.chemicals" class="custom-checkbox">
                                    Chemicals
                                </Checkbox>
                            </div>
                            <div class="flex items-center space-x-2">
                                <Checkbox v-model:checked="filters.industry1.electronics" class="custom-checkbox">
                                    Electronics & Semiconductors
                                </Checkbox>
                            </div>
                        </div>
                    </div>

                    <!-- Industry Filter 2 -->
                    <div>
                        <button @click="toggleSection('industry2')"
                            class="flex items-center justify-between w-full text-left">
                            <h3 class="text-[#1f2937] font-medium">Industry</h3>
                            <DownOutlined :class="[
                                'w-4 h-4 transition-transform',
                                expandedSections.industry2 ? 'rotate-180' : ''
                            ]" />
                        </button>
                        <div v-show="expandedSections.industry2" class="mt-3 space-y-3">
                            <div class="flex items-center space-x-2">
                                <Checkbox v-model:checked="filters.industry2.all" class="custom-checkbox">
                                    All
                                </Checkbox>
                            </div>
                            <div class="flex items-center space-x-2">
                                <Checkbox v-model:checked="filters.industry2.declarationPackaging"
                                    class="custom-checkbox">
                                    Declaration, Packaging
                                </Checkbox>
                            </div>
                            <div class="flex items-center space-x-2">
                                <Checkbox v-model:checked="filters.industry2.warehousing" class="custom-checkbox">
                                    Warehousing
                                </Checkbox>
                            </div>
                            <div class="flex items-center space-x-2">
                                <Checkbox v-model:checked="filters.industry2.declaration" class="custom-checkbox">
                                    Declaration
                                </Checkbox>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content Area -->
            <div class="flex-1">
                <!-- Projects Header -->
                <div class="flex items-center justify-between mb-8">
                    <h1 class="text-[#b44028] text-3xl font-semibold">Projects</h1>
                    <Select v-model:value="sortBy" style="width: 128px" :options="sortOptions" />
                </div>

                <!-- Projects Grid -->
                <div class="grid grid-cols-3 gap-6">
                    <ProjectCard v-for="card in projects" :key="card.id" :project="card" />
                </div>
            </div>
        </div>

        <!-- Floating Action Buttons -->
        <div class="fixed bottom-6 right-6 space-y-3 z-30">
            <Button type="primary" shape="circle" size="large"
                class="w-12 h-12 bg-[#b44028] hover:bg-[#9f2d17] border-[#b44028] shadow-lg">
                <template #icon>
                    <PhoneOutlined class="text-white" />
                </template>
            </Button>
            <Button type="primary" shape="circle" size="large"
                class="w-12 h-12 bg-[#b44028] hover:bg-[#9f2d17] border-[#b44028] shadow-lg">
                <template #icon>
                    <MessageOutlined class="text-white" />
                </template>
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProjectCard from '@/components/projects/ProjectCard.vue'
import {
    ArrowLeftOutlined,
    DownOutlined,
    MessageOutlined,
    PhoneOutlined
} from '@ant-design/icons-vue'
import { Button, Checkbox, Select } from 'ant-design-vue'
import { reactive, ref } from 'vue'

interface ExpandedSections {
    project: boolean
    origin: boolean
    industry1: boolean
    industry2: boolean
}

interface Project {
    id: number
    title: string
    date: string
    image: string
    description: string
    alt: string
}

interface SortOption {
    value: string
    label: string
}

// Reactive state
const expandedSections = reactive<ExpandedSections>({
    project: true,
    origin: true,
    industry1: true,
    industry2: true,
})

const filters = reactive({
    project: {
        all: true,
        aircraft: false,
        chemicals: false,
        ink: false
    },
    origin: {
        all: true,
        uk: false,
        japan: false,
        vietnam: false,
        korea: false,
        italy: false
    },
    industry1: {
        all: true,
        aerospace: false,
        chemicals: false,
        electronics: false
    },
    industry2: {
        all: true,
        declarationPackaging: false,
        warehousing: false,
        declaration: false
    }
})

const sortBy = ref<string>('popular')

const sortOptions: SortOption[] = [
    { value: 'popular', label: 'Popular' },
    { value: 'recent', label: 'Recent' },
    { value: 'oldest', label: 'Oldest' }
]

const projects: Project[] = [
    {
        id: 1,
        title: 'DGpac Singapore',
        date: 'Dec 2023',
        image: '/images/projects/project_1.jpg',
        alt: 'DGpac Singapore warehouse facility',
        description:
            "DGpac recently completed a business trip to Singapore to execute a hazardous goods transportation project. This marks a key step in expanding our regional presence and demonstrates DGpac's capability in delivering safe, reliable logistics solutions on ..."
    },
    {
        id: 2,
        title: 'DGpac UNBOX',
        date: 'Dec 2023',
        image: '/images/projects/project_2.jpg',
        alt: 'DGpac UNBOX warehouse interior',
        description:
            'Our innovative UNBOX solution revolutionizes warehouse management through advanced automation and smart logistics. This project showcases our commitment to modernizing supply chain operations with cutting-edge technology and efficient processes ...'
    },
    {
        id: 3,
        title: 'DGpac Singapore',
        date: 'Dec 2023',
        image: '/images/projects/project_3.jpg',
        alt: 'DGpac Singapore shipping containers',
        description:
            'Expanding our container logistics capabilities in Singapore, this project demonstrates our expertise in international shipping and freight management. Our comprehensive approach ensures seamless operations across multiple transportation modes ...'
    }
]


// Methods
const toggleSection = (section: keyof ExpandedSections): void => {
    expandedSections[section] = !expandedSections[section]
}
</script>

<style scoped>
/* Custom checkbox styling to match the original design */
:deep(.custom-checkbox .ant-checkbox-checked .ant-checkbox-inner) {
    background-color: #b44028;
    border-color: #b44028;
}

:deep(.custom-checkbox .ant-checkbox:hover .ant-checkbox-inner) {
    border-color: #b44028;
}

:deep(.custom-checkbox .ant-checkbox-wrapper:hover .ant-checkbox-inner) {
    border-color: #b44028;
}

/* Custom button styling */
:deep(.ant-btn-primary) {
    background-color: #b44028;
    border-color: #b44028;
}

:deep(.ant-btn-primary:hover) {
    background-color: #9f2d17 !important;
    border-color: #9f2d17 !important;
}
</style>