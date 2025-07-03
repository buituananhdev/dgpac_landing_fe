<template>
    <BaseSection id="about" title="About Us" subtitle="Your trusted partner in dangerous goods management">
        <Row :gutter="[48, 48]">
            <!-- Left Column: Bullet Points -->
            <Col :xs="24" :lg="12" data-aos="fade-right">
            <div class="mb-6">
                <h3 class="text-2xl font-bold mb-4 text-[#962D33]">Why Choose Us</h3>
                <ul class="space-y-4">
                    <li v-for="(point, index) in bulletPoints" :key="index" class="flex items-start">
                        <CheckCircleOutlined class="text-[#962D33] mt-1 mr-3" />
                        <span>{{ point }}</span>
                    </li>
                </ul>
            </div>

            <div>
                <h3 class="text-2xl font-bold mb-4 text-[#962D33]">Our Mission</h3>
                <p class="text-[#1D1D1B]/80 mb-4">
                    Our mission is to make the handling and transportation of dangerous goods safe,
                    compliant, and efficient through expert training, consultation, and innovative solutions.
                </p>
                <p class="text-[#1D1D1B]/80">
                    We are committed to reducing risks, preventing incidents, and protecting both people
                    and the environment from the potential hazards associated with dangerous goods.
                </p>
            </div>
            </Col>

            <!-- Right Column: Image and Accreditations -->
            <Col :xs="24" :lg="12">
            <div class="mb-8" data-aos="fade-left">
                <img src="../../assets/images/about-image.jpg" alt="About DGPAC" class="w-full rounded-lg shadow-lg" />
            </div>

            <div data-aos="fade-up">
                <h3 class="text-2xl font-bold mb-4 text-[#962D33]">Accreditations</h3>
                <div class="flex flex-wrap gap-6 justify-center sm:justify-start">
                    <img v-for="(accreditation, index) in accreditations" :key="index" :src="accreditation"
                        :alt="`Accreditation ${index + 1}`" class="h-16 object-contain" />
                </div>
            </div>
            </Col>
        </Row>
    </BaseSection>
</template>

<script setup lang="ts">
import { CheckCircleOutlined } from '@ant-design/icons-vue';
import { Col, Row } from 'ant-design-vue';
import { withDefaults } from 'vue';
import BaseSection from '../base/BaseSection.vue';

interface Props {
    bulletPoints?: string[];
    accreditations?: string[];
}

withDefaults(defineProps<Props>(), {
    bulletPoints: () => [
        'Over 20 years of industry experience',
        'Certified dangerous goods safety advisors',
        'Comprehensive training programs tailored to your needs',
        'Up-to-date with the latest regulations and compliance requirements',
        'Proven track record with major industry clients',
        'Emergency response planning and support'
    ],
    accreditations: () => [
        '../../assets/images/accreditation-1.png',
        '../../assets/images/accreditation-2.png',
        '../../assets/images/accreditation-3.png'
    ]
});
</script>
