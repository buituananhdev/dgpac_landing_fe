<template>
    <div>
        <main>
            <section id="home">
                <HeroSection />
                <QuestionSection :questions="services" />
            </section>

            <section id="services">
                <ServicesSection />
                <LocationExpertise />
            </section>

            <section id="products">
                <ProductsSection />
            </section>

            <section id="projects">
                <ProjectsSection />
            </section>

            <section id="guides">
                <GuidesSection />
            </section>

            <section id="contact">
                <TeamSection :products="products" />
            </section>
        </main>
    </div>
</template>

<style scoped>
main {
    position: relative;
    z-index: 0;
    overflow: hidden;
}

main::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/home.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    filter: blur(8px);
    z-index: -1;
}

/* Ensure sections have proper spacing for scroll detection */
section {
    min-height: 50vh;
    /* Minimum height to ensure proper scroll detection */
    scroll-margin-top: 80px;
    /* Account for fixed header */
}

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}
</style>

<script setup lang="ts">
import GuidesSection from '@/components/guides/GuidesSection.vue';
import HeroSection from '@/components/hero/HeroSection.vue';
import LocationExpertise from '@/components/location-expertise/LocationExpertise.vue';
import ProductsSection from '@/components/products/ProductsSection.vue';
import ProjectsSection from '@/components/projects/ProjectsSection.vue';
import QuestionSection from '@/components/questions/QuestionSection.vue';
import ServicesSection from '@/components/services/ServicesSection.vue';
import TeamSection from '@/components/team/TeamSection.vue';
import { ref } from 'vue';
import type { BlogArticle, BlogTag, ProductItem, ServiceItem } from '../types';

// Mock data for services
const services = ref<ServiceItem[]>([
    {
        id: 1,
        title: 'Dangerous Goods Declaration',
        description: 'Expert guidance on navigating complex dangerous goods regulations and ensuring full compliance.',
        icon: '../../assets/icons/device-1.svg'
    },
    {
        id: 2,
        title: 'Dangerous Goods Packaging',
        description: 'Comprehensive training for emergency response teams handling hazardous material incidents.',
        icon: '../../assets/icons/device-2.svg'
    },
    {
        id: 3,
        title: 'Decanting Services',
        description: 'Certified training programs for staff involved in handling and transporting dangerous goods.',
        icon: '../../assets/icons/device-3.svg'
    },
    {
        id: 4,
        title: 'Dangerous Goods Declaration',
        description: 'Expert guidance on navigating complex dangerous goods regulations and ensuring full compliance.',
        icon: '../../assets/icons/device-1.svg'
    },
    {
        id: 5,
        title: 'Dangerous Goods Packaging',
        description: 'Comprehensive training for emergency response teams handling hazardous material incidents.',
        icon: '../../assets/icons/device-2.svg'
    },
    {
        id: 6,
        title: 'Decanting Services',
        description: 'Certified training programs for staff involved in handling and transporting dangerous goods.',
        icon: '../../assets/icons/device-3.svg'
    },
]);

// Mock data for products
const products = ref<ProductItem[]>([
    {
        id: 1,
        title: 'Safety Management System',
        description: 'Comprehensive software solution for managing dangerous goods safety protocols.',
        image: '/images/product-1.jpg'
    },
    {
        id: 2,
        title: 'Compliance Documentation Kit',
        description: 'Complete set of templates and documents for regulatory compliance.',
        image: '/images/product-2.jpg'
    },
    {
        id: 3,
        title: 'Training Materials Package',
        description: 'Professional training materials for in-house dangerous goods instruction.',
        image: '/images/product-3.jpg'
    },
    {
        id: 4,
        title: 'Emergency Response Guide',
        description: 'Detailed guide for handling dangerous goods emergencies and incidents.',
        image: '/images/product-4.jpg'
    },
    {
        id: 5,
        title: 'Hazard Identification Tool',
        description: 'Digital tool for quickly identifying and categorizing dangerous goods.',
        image: '/images/product-1.jpg'
    },
    {
        id: 6,
        title: 'Transport Compliance Package',
        description: 'Specialized solutions for transport companies handling dangerous goods.',
        image: '/images/product-2.jpg'
    }
]);

// Mock data for blog tags
const blogTags = ref<BlogTag[]>([
    { id: 1, name: 'Regulatory' },
    { id: 2, name: 'BestPractice' },
    { id: 3, name: 'Training' },
    { id: 4, name: 'Safety' },
    { id: 5, name: 'Transport' },
    { id: 6, name: 'Compliance' }
]);

// Mock data for blog articles
const blogArticles = ref<BlogArticle[]>([
    {
        id: 1,
        title: 'New Regulations for Dangerous Goods Transport in 2023',
        excerpt: 'Stay updated with the latest regulatory changes affecting dangerous goods transportation.',
        date: 'June 15, 2023',
        tags: [1, 6]
    },
    {
        id: 2,
        title: 'Best Practices for Handling Chemical Spills',
        excerpt: 'Learn the most effective techniques for managing and containing hazardous chemical spills.',
        date: 'May 22, 2023',
        tags: [2, 4]
    },
    {
        id: 3,
        title: 'Training Your Team for Dangerous Goods Compliance',
        excerpt: 'Effective strategies for ensuring your team is properly trained in dangerous goods handling.',
        date: 'April 10, 2023',
        tags: [3, 6]
    },
    {
        id: 4,
        title: 'The Impact of Brexit on Dangerous Goods Documentation',
        excerpt: 'Understanding how Brexit has changed the documentation requirements for dangerous goods.',
        date: 'March 5, 2023',
        tags: [1, 5, 6]
    }
]);
</script>