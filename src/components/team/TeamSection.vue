<template>
    <BaseSection id="services" title="OUR TEAM" subtitle="" bgColor="light">
        <Carousel :slidesToShow="slidesToShow" :slidesToScroll="slidesToScroll" :responsive="responsiveSettings"
            :autoplay="false" :swipeToSlide="true" :touchMove="true" :draggable="true" :arrows="true" :infinite="true">
            <div v-for="(member, index) in teamMembers" :key="index" class="px-2">
                <div class="member-card bg-white mx-auto max-w-[280px] min-h-[520px]">
                    <div class="aspect-square relative inline-block img-container">
                        <img :src="member.image" :alt="member.name" class="w-full h-full object-cover" />
                    </div>
                    <div class="p-3 text-center">
                        <h3 class="text-[28px] leading-9 font-semibold text-[#b44028] mb-1">{{ member.name }}</h3>
                        <div class="w-12 h-[1.5px] bg-[#b44028] mx-auto mb-4"></div>
                        <h4 class="text-[20px] leading-7 font-medium text-dark mb-3">{{ member.title }}</h4>
                        <p class="text-dark text-lg">
                            {{ member.description }}
                        </p>
                    </div>
                </div>
            </div>
        </Carousel>
    </BaseSection>
</template>

<style scoped>
.member-card {
    box-shadow: 0px 6px 15px -2px rgba(16, 24, 40, 0.08);
    overflow: hidden;
}

/* .img-container:after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 30px 30px 0;
    border-color: transparent #608A32 transparent transparent;
    right: 0;
    bottom: 0;
    position: absolute;
} */
</style>

<script lang="ts" setup>
import { Carousel } from 'ant-design-vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'

// Register component locally
defineOptions({
    components: {
        Carousel,
    },
})

interface TeamMember {
    name: string
    title: string
    image: string
    description: string
}

const teamMembers = ref<TeamMember[]>([
    {
        name: 'Trinh Thanh Binh',
        title: 'CEO',
        description: 'CEO with 15+ years in logistics, driving DGpac\'s global growth and safety-first approach.',
        image: '/images/team/team_1.jpg?height=300&width=300',
    },
    {
        name: 'Nguyen Van A',
        title: 'CTO',
        description: 'CTO with expertise in technology and innovation, leading digital transformation initiatives.',
        image: '/images/team/team_1.jpg?height=300&width=300',
    },
    {
        name: 'Le Thi B',
        title: 'CFO',
        description: 'CFO with strong financial background, ensuring sustainable growth and financial stability.',
        image: '/images/team/team_1.jpg?height=300&width=300',
    },
    {
        name: 'Tran Van C',
        title: 'COO',
        description: 'COO overseeing daily operations and ensuring efficient delivery of logistics services.',
        image: '/images/team/team_1.jpg?height=300&width=300',
    }
])

// Responsive settings
const windowWidth = ref(window.innerWidth)

const slidesToShow = computed(() => {
    if (windowWidth.value >= 1280) return 4 // xl screens
    if (windowWidth.value >= 1024) return 3 // lg screens  
    if (windowWidth.value >= 768) return 2  // md screens
    return 1 // sm screens and below
})

const slidesToScroll = computed(() => {
    if (windowWidth.value >= 1280) return 4
    if (windowWidth.value >= 1024) return 3
    if (windowWidth.value >= 768) return 2
    return 1
})

const responsiveSettings = [
    {
        breakpoint: 1280,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
        }
    },
    {
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
        }
    },
    {
        breakpoint: 768,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
        }
    },
    {
        breakpoint: 640,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
        }
    }
]

const handleResize = () => {
    windowWidth.value = window.innerWidth
}

onMounted(() => {
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>