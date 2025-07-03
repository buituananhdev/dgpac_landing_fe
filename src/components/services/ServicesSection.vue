<template>
  <BaseSection id="services" bgColor="dark">
    <!-- Header Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-0 mb-8">
      <!-- Left Red Section -->
      <div class="bg-[#9f2d17] p-8 lg:p-12 flex items-center">
        <h1 class="text-white text-[52px] lg:text-5xl font-semibold leading-tight">
          OUR<br />SERVICES
        </h1>
      </div>

      <!-- Middle Gray Section -->
      <div class="bg-[#d1d5db] p-8 font-semibold lg:p-12 flex flex-col justify-center">
        <p class="text-[#9f2d17] text-lg font-semibold mb-2 tracking-wide">WHAT WE DO</p>
        <h2 class="text-black text-2xl lg:text-4xl font-bold leading-tight">
          We offer safe transportation of dangerous goods.
        </h2>
      </div>

      <!-- Top Right Service Card -->
      <ServiceCard icon="service_1" title="Decanting Services"
        text="Transfer of hazardous liquids from bulk to smaller packaging" />

      <!-- Dangerous Goods Declaration -->
      <ServiceCard icon="service_2" title="Dangerous Goods Declaration"
        text="Preparation of DG Declaration (DGD) with 100% compliance" />

      <!-- Dangerous Goods Packaging -->
      <ServiceCard icon="service_3" title="Dangerous Goods Packaging"
        text="Secure UN-certified packaging tailored to each DG class, transport mode, and regulatory requirement" />

      <!-- Dangerous Goods Training -->
      <ServiceCard icon="service_1" title="Dangerous Goods Training"
        text="IATA CBTA (Competency-Based Training and Assessment) programs & advisory services" />

      <!-- Dangerous Goods Transport -->
      <ServiceCard icon="service_2" title="Dangerous Goods Transport" text="Safe & compliant DG collection and delivery" />

      <!-- Dangerous Goods Warehouse -->
      <ServiceCard icon="service_3" title="Dangerous Goods Warehouse"
        text="Licensed DG facilities with fire suppression, temperature control, and DG-certified personnel" />

      <!-- Expert on Location -->
      <ServiceCard icon="service_1" title="Expert on Location"
        text="Arrive at your site, equipped with certified DG packaging, ready to handle everything" />
    </div>
  </BaseSection>
</template>

<script lang="ts" setup>
import ServiceCard from './ServiceCard.vue';
</script>
