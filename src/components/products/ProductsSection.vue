<template>
    <BaseSection id="services" title="OUR PRODUCTS" subtitle="" bgColor="dark">
        <!-- Products Grid -->
        <div class="space-y-8 md:pb-16">
            <!-- UN 4G/4GV Boxes (Full-width) -->
            <ProductCardLarge :product="featuredProduct" class="hidden md:block" />
            <ProductCard :product="featuredProduct" class="block md:hidden" />

            <!-- Bottom row: 3 columns -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ProductCard v-for="(product, index) in products" :key="index" :product="product" />
            </div>
        </div>
    </BaseSection>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ProductCard from './ProductCard.vue'
import ProductCardLarge from './ProductCardLarge.vue'

interface Product {
    image: string
    title: string
    description: string
}

const featuredProduct: Product = {
    image: '/images/products/product_2.png',
    title: 'UN 4G/4GV Boxes',
    description: 'Certified packaging for hazardous materials.'
}

const products = ref<Product[]>([
    {
        image: '/images/products/product_1.png',
        title: 'Bio-Bottles',
        description: 'Official bio-bottle distributor, compliant packaging for biological substances.'
    },
    {
        image: '/images/products/product_3.png',
        title: 'Hazardous Labels',
        description: 'IATA / IMDG / ADR-compliant hazard labels and marks for all DG classifications'
    },
    {
        image: '/images/products/product_4.png',
        title: 'Others',
        description: 'Customs packing materials, including vermiculite, gel packs, styrofoam peanuts, etc.'
    }
])
</script>
