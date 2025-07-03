<template>
    <Affix :offset-top="0">
        <header :class="[
            'w-full z-50 transition-all duration-300',
            scrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm'
        ]">
            <div class="max-w-7xl mx-auto px-8">
                <div class="flex items-center justify-between h-[80px]">
                    <!-- Logo -->
                    <div class="flex items-center cursor-pointer" @click="scrollToSection('home')">
                        <img src="/images/logo.png" alt="DGpac Logo" class="h-[58px] w-auto">
                    </div>

                    <!-- Desktop Navigation -->
                    <div class="hidden lg:flex items-center justify-end flex-1">
                        <nav class="flex items-center space-x-8">
                            <a @click.prevent="scrollToSection('home')"
                                :class="['nav-link', activeSection === 'home' ? 'active' : '']"
                                class="cursor-pointer transition-colors duration-300">
                                Home
                            </a>
                            <a @click.prevent="scrollToSection('services')"
                                :class="['nav-link', activeSection === 'services' ? 'active' : '']"
                                class="cursor-pointer transition-colors duration-300">
                                Services
                            </a>
                            <a @click.prevent="scrollToSection('products')"
                                :class="['nav-link', activeSection === 'products' ? 'active' : '']"
                                class="cursor-pointer transition-colors duration-300">
                                Products
                            </a>
                            <a @click.prevent="scrollToSection('projects')"
                                :class="['nav-link', activeSection === 'projects' ? 'active' : '']"
                                class="cursor-pointer transition-colors duration-300">
                                Projects
                            </a>
                            <a @click.prevent="scrollToSection('guides')"
                                :class="['nav-link', activeSection === 'guides' ? 'active' : '']"
                                class="cursor-pointer transition-colors duration-300">
                                Guides
                            </a>
                            <a @click.prevent="scrollToSection('contact')"
                                :class="['nav-link', activeSection === 'contact' ? 'active' : '']"
                                class="cursor-pointer transition-colors duration-300">
                                Contacts
                            </a>
                        </nav>
                    </div>

                    <!-- Mobile Menu Button -->
                    <div class="lg:hidden">
                        <Button type="text" @click="showDrawer = true">
                            <MenuOutlined />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    </Affix>

    <!-- Mobile Navigation Drawer -->
    <Drawer placement="right" :closable="false" v-model:open="showDrawer" width="250">
        <div class="flex justify-end mb-4">
            <Button type="text" @click="showDrawer = false">
                <CloseOutlined />
            </Button>
        </div>
        <nav class="flex flex-col space-y-2">
            <a @click.prevent="scrollToSection('home')"
                :class="['mobile-nav-link', activeSection === 'home' ? 'active' : '']" class="cursor-pointer">
                Home
            </a>
            <a @click.prevent="scrollToSection('services')"
                :class="['mobile-nav-link', activeSection === 'services' ? 'active' : '']" class="cursor-pointer">
                Services
            </a>
            <a @click.prevent="scrollToSection('products')"
                :class="['mobile-nav-link', activeSection === 'products' ? 'active' : '']" class="cursor-pointer">
                Products
            </a>
            <a @click.prevent="scrollToSection('projects')"
                :class="['mobile-nav-link', activeSection === 'projects' ? 'active' : '']" class="cursor-pointer">
                Projects
            </a>
            <a @click.prevent="scrollToSection('guides')"
                :class="['mobile-nav-link', activeSection === 'guides' ? 'active' : '']" class="cursor-pointer">
                Guides
            </a>
            <a @click.prevent="scrollToSection('contact')"
                :class="['mobile-nav-link', activeSection === 'contact' ? 'active' : '']" class="cursor-pointer">
                Contacts
            </a>
        </nav>
    </Drawer>
</template>

<script setup lang="ts">
import { CloseOutlined, MenuOutlined } from '@ant-design/icons-vue'
import { Affix, Button, Drawer } from 'ant-design-vue'
import { onMounted, onUnmounted, ref } from 'vue'

const scrolled = ref(false)
const showDrawer = ref(false)
const activeSection = ref('home')
const sections = ['home', 'services', 'products', 'projects', 'guides', 'contact']

// Smooth scroll to section
const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
        const headerHeight = 80 // Adjust based on your header height
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        })

        // Update active section immediately for better UX
        activeSection.value = sectionId

        // Close mobile drawer if open
        showDrawer.value = false
    }
}

const handleScroll = () => {
    scrolled.value = window.scrollY > 50

    // Find the current active section based on scroll position
    const scrollPosition = window.scrollY + 150 // Offset for header height

    // Check each section from bottom to top
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
            const sectionTop = section.offsetTop
            const sectionHeight = section.offsetHeight

            // Check if current scroll position is within this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection.value = sections[i]
                break
            }
        }
    }

    // Handle edge case for home section when at top
    if (window.scrollY < 100) {
        activeSection.value = 'home'
    }
}

// Throttle scroll handler for better performance
let scrollTimeout: ReturnType<typeof setTimeout>
const throttledHandleScroll = () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout)
    }
    scrollTimeout = setTimeout(handleScroll, 10)
}

onMounted(() => {
    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    handleScroll() // Initial call
})

onUnmounted(() => {
    window.removeEventListener('scroll', throttledHandleScroll)
    if (scrollTimeout) {
        clearTimeout(scrollTimeout)
    }
})
</script>

<style scoped>
.ant-affix {
    background: transparent !important;
}

/* Custom navigation styles */
.nav-link {
    color: #6b7280;
    font-size: 16px;
    font-weight: 400;
    padding: 8px 0;
    position: relative;
    text-decoration: none;
}

.nav-link:hover {
    color: #1f2937 !important;
}

.nav-link.active {
    color: #b44028 !important;
    font-weight: 500;
}

/* Mobile menu styles */
.mobile-nav-link {
    color: #374151;
    font-size: 16px;
    font-weight: 400;
    text-decoration: none;
    padding: 12px 16px;
    display: block;
    border-radius: 8px;
    transition: all 0.3s ease;
    margin: 4px 0;
}

.mobile-nav-link:hover {
    color: #b44028 !important;
    background-color: #f9fafb;
}

.mobile-nav-link.active {
    color: #b44028 !important;
    font-weight: 500;
    background-color: transparent;
}

/* Responsive breakpoints */
@media (max-width: 1024px) {
    .nav-link {
        font-size: 14px;
    }
}

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}
</style>