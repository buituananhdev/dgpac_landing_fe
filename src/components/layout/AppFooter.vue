<template>
    <footer class="bg-[#1D1D1B] text-white py-12">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row justify-between items-center mb-8">
                <div class="mb-6 md:mb-0">
                    <img src="../../assets/images/logo.png" alt="DGPAC Logo" class="h-10" />
                </div>

                <div class="flex space-x-4">
                    <a href="#" class="text-white hover:text-[#C16063] transition-colors">
                        <FacebookOutlined class="text-xl" />
                    </a>
                    <a href="#" class="text-white hover:text-[#C16063] transition-colors">
                        <TwitterOutlined class="text-xl" />
                    </a>
                    <a href="#" class="text-white hover:text-[#C16063] transition-colors">
                        <LinkedinOutlined class="text-xl" />
                    </a>
                    <a href="#" class="text-white hover:text-[#C16063] transition-colors">
                        <InstagramOutlined class="text-xl" />
                    </a>
                </div>
            </div>

            <div class="border-t border-white/20 pt-8">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <p class="text-sm text-white/70 mb-4 md:mb-0">
                        &copy; {{ new Date().getFullYear() }} DGPAC. All rights reserved.
                    </p>

                    <div class="flex flex-wrap gap-4 text-sm text-white/70">
                        <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" class="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </div>

        <BackTop>
            <div
                class="bg-[#962D33] text-white flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#B74E4C] transition-colors">
                <UpOutlined />
            </div>
        </BackTop>
    </footer>
</template>

<script setup lang="ts">
import {
    FacebookOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    TwitterOutlined,
    UpOutlined
} from '@ant-design/icons-vue';
import { BackTop } from 'ant-design-vue';
</script>
