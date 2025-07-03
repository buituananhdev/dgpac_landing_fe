<template>
    <BaseSection id="services" bgColor="light">
        <section class="section-wrapper">
            <div class="container-center">
                <div class="services-flex">
                    <!-- Left Image -->
                    <div class="services-image">
                        <img src="/images/services/warehouse-forklift.png" alt="Warehouse operations with forklift"
                            class="full-img" />
                    </div>

                    <!-- Right Content -->
                    <div class="services-content">
                        <Space direction="vertical" size="large" class="w-full">
                            <!-- Service 1 -->
                            <div class="service-block">
                                <div class="service-avatar">
                                    <Avatar :size="45">
                                        <img src="/images/icons/icon_question_1.svg" alt="">
                                    </Avatar>
                                </div>
                                <div>
                                    <h3 class="service-title">DG Regulations Are Too Complicated</h3>
                                    <h4 class="service-subtitle">We Make It Simple</h4>
                                    <p class="service-desc">
                                        Regulations. Packaging. Documentation. One small mistake can mean costly delays,
                                        fines, or
                                        rejected shipments. With 15+ years of DG expertise, we navigate the complexities
                                        for you.
                                    </p>
                                </div>
                            </div>

                            <!-- Service 2 -->
                            <div class="service-block">
                                <div class="service-avatar">
                                    <Avatar :size="45">
                                        <img src="/images/icons/icon_question_2.svg" alt="">
                                    </Avatar>
                                </div>
                                <div>
                                    <h3 class="service-title">"What If We Get It Wrong?"</h3>
                                    <h4 class="service-subtitle">We Get It Right the First Time.</h4>
                                    <p class="service-desc">
                                        IATA, IMDG, ICAO, ADR... The rules are strict, and non-compliance isn't an
                                        option. Every shipment we
                                        handle is meticulously packed, documented, and transported to meet the highest
                                        safety standards. No
                                        risks. No shortcuts. No surprises.
                                    </p>
                                </div>
                            </div>

                            <!-- Service 3 -->
                            <div class="service-block">
                                <div class="service-avatar">
                                    <Avatar :size="45">
                                        <img src="/images/icons/icon_question_3.svg" alt="">
                                    </Avatar>
                                </div>
                                <div>
                                    <h3 class="service-title">"We Can't Afford Delays"</h3>
                                    <h4 class="service-subtitle">We Keep You Moving</h4>
                                    <p class="service-desc">
                                        Regulations. Packaging. Documentation. One small mistake can mean costly delays,
                                        fines, or
                                        rejected shipments. With 15+ years of DG expertise, we navigate the complexities
                                        for you.
                                    </p>
                                </div>
                            </div>
                        </Space>
                    </div>
                </div>
            </div>
        </section>
    </BaseSection>
</template>


<style scoped>
.section-wrapper {
    padding-top: 5rem;
}

.container-center {
    max-width: 100%;
}

.services-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
}

/* Left image 40% */
.services-image {
    flex: 0 0 40%;
}

/* Right content 60% */
.services-content {
    flex: 1 1 57%;
}

.full-img {
    width: 100%;
    height: 600px;
    object-fit: cover;
}

/* Responsive - hide image on mobile */
@media (max-width: 768px) {
    .services-flex {
        flex-direction: column;
    }

    .services-image {
        display: none;
    }

    .services-content {
        flex: 1 1 100%;
    }

    .full-img {
        height: auto;
        max-height: 400px;
    }
}

.service-block {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 40px;
}

.service-avatar {
    flex-shrink: 0;
    display: flex;
    justify-content: start;
    align-items: start;
}

.service-title {
    color: var(--Primary-Colours-Neutral-Neutral-800, #1F2937);
    font-size: 20px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: -0.4px;
}

.service-subtitle {
    color: var(--Primary-Colours-Primary-Primary-500, #B44028);
    font-family: Oswald;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: -0.48px;
    margin-bottom: 15px;
}

.service-desc {
    color: var(--Primary-Colours-Neutral-Neutral-800, #1F2937);
    font-size: 18px;
    font-weight: 500;
    line-height: 28px;
}
</style>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { ServiceItem } from '../../types';
import BaseSection from '../base/BaseSection.vue';

interface Props {
    questions: ServiceItem[];
}

defineProps<Props>();
</script>
