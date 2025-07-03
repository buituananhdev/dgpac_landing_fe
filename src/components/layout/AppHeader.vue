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

// Get active section from current URL
const getActiveSectionFromUrl = () => {
    const currentPath = window.location.pathname.toLowerCase()
    
    // Remove leading slash and file extensions
    const cleanPath = currentPath.replace(/^\//, '').replace(/\.(html|php)$/, '')
    
    // Check if current path matches any section
    if (sections.includes(cleanPath)) {
        return cleanPath
    }
    
    // Check for common path variations
    const pathMappings: { [key: string]: string } = {
        '': 'home',
        'index': 'home',
        'homepage': 'home',
        'service': 'services',
        'product': 'products',
        'project': 'projects',
        'guide': 'guides',
        'contact': 'contact',
        'contacts': 'contact',
        'about': 'home' // or create separate 'about' section if needed
    }
    
    return pathMappings[cleanPath] || 'home'
}

// Smooth scroll to section with navigation support
const scrollToSection = (sectionId: string) => {
    const currentSection = getActiveSectionFromUrl()
    
    // If clicking on the same section we're already on, scroll to top
    if (currentSection === sectionId) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        showDrawer.value = false
        return
    }
    
    // For all other cases, navigate to home page and scroll to section
    const currentPath = window.location.pathname.toLowerCase()
    const isHomePage = currentPath === '/' || currentPath === '' || currentPath === '/index.html' || currentPath === '/home'
    
    if (isHomePage) {
        // Already on home page, just scroll to section
        const element = document.getElementById(sectionId)
        
        if (element) {
            const headerHeight = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })

            // Update active section immediately for better UX
            activeSection.value = sectionId
        } else {
            // Element not found, try again after a short delay
            setTimeout(() => {
                const elementRetry = document.getElementById(sectionId)
                if (elementRetry) {
                    const headerHeight = 80
                    const elementPosition = elementRetry.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    })

                    activeSection.value = sectionId
                }
            }, 100)
        }
    } else {
        // Not on home page, navigate to home with section hash
        window.location.href = `/#${sectionId}`
    }
    
    // Close mobile drawer if open
    showDrawer.value = false
}

// Handle scroll to section on page load (for hash navigation)
const handleHashNavigation = () => {
    const hash = window.location.hash.substring(1) // Remove the '#'
    if (hash && sections.includes(hash)) {
        // Small delay to ensure page is loaded
        setTimeout(() => {
            const element = document.getElementById(hash)
            if (element) {
                const headerHeight = 80
                const elementPosition = element.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                })

                activeSection.value = hash
            }
        }, 100)
    }
}

const handleScroll = () => {
    scrolled.value = window.scrollY > 50

    // Only update active section based on scroll if we're on a page with sections
    const currentSection = getActiveSectionFromUrl()
    const isHomePage = currentSection === 'home'
    
    if (isHomePage) {
        // Find the current active section based on scroll position (for home page)
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
    } else {
        // For other pages, keep the active section based on URL
        activeSection.value = currentSection
    }
}

// Initialize active section based on current URL
const initializeActiveSection = () => {
    const urlSection = getActiveSectionFromUrl()
    activeSection.value = urlSection
    
    // If there's a hash in the URL, handle it
    const hash = window.location.hash.substring(1)
    if (hash && sections.includes(hash)) {
        activeSection.value = hash
        // Small delay to ensure page is loaded
        setTimeout(() => {
            scrollToSection(hash)
        }, 100)
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
    // Initialize active section based on current URL
    initializeActiveSection()
    
    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    handleScroll() // Initial call
    
    // Listen for hash changes (browser back/forward)
    window.addEventListener('hashchange', handleHashNavigation)
    
    // Listen for popstate (browser back/forward for full page navigation)
    window.addEventListener('popstate', () => {
        setTimeout(() => {
            initializeActiveSection()
        }, 100)
    })
})

onUnmounted(() => {
    window.removeEventListener('scroll', throttledHandleScroll)
    window.removeEventListener('hashchange', handleHashNavigation)
    window.removeEventListener('popstate', initializeActiveSection)
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