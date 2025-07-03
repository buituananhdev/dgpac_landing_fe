<template>
    <BaseSection id="contact" title="Contact Us" subtitle="Get in touch with our team of experts">
        <TeamSection :team="team" />
        <Row :gutter="[48, 48]">
            <!-- Contact Form -->
            <Col :xs="24" :lg="14" data-aos="fade-right">
            <Form :model="formState" :rules="rules" @finish="onFinish" layout="vertical">
                <Row :gutter="16">
                    <Col :xs="24" :md="12">
                    <FormItem name="name" label="Name">
                        <Input v-model:value="formState.name" placeholder="Your name" />
                    </FormItem>
                    </Col>
                    <Col :xs="24" :md="12">
                    <FormItem name="email" label="Email">
                        <Input v-model:value="formState.email" placeholder="Your email" />
                    </FormItem>
                    </Col>
                </Row>

                <FormItem name="subject" label="Subject">
                    <Input v-model:value="formState.subject" placeholder="How can we help you?" />
                </FormItem>

                <FormItem name="message" label="Message">
                    <Textarea v-model:value="formState.message" placeholder="Tell us more about your requirements"
                        :rows="6" />
                </FormItem>

                <FormItem>
                    <BaseButton type="primary" html-type="submit" :loading="submitting" size="large">
                        Send Message
                    </BaseButton>
                </FormItem>
            </Form>
            </Col>

            <!-- Contact Information -->
            <Col :xs="24" :lg="10" data-aos="fade-left">
            <div class="bg-[#E4E4E4]/30 p-6 rounded-lg">
                <h3 class="text-2xl font-bold mb-6 text-[#962D33]">Get In Touch</h3>

                <div class="space-y-6">
                    <div class="flex items-start">
                        <EnvironmentOutlined class="text-[#962D33] text-xl mt-1 mr-4" />
                        <div>
                            <h4 class="font-bold mb-1">Office Address</h4>
                            <p class="text-[#1D1D1B]/70">
                                123 Safety Street<br />
                                Hazard Building, Suite 456<br />
                                London, UK
                            </p>
                        </div>
                    </div>

                    <div class="flex items-start">
                        <PhoneOutlined class="text-[#962D33] text-xl mt-1 mr-4" />
                        <div>
                            <h4 class="font-bold mb-1">Phone</h4>
                            <p class="text-[#1D1D1B]/70">
                                +44 (0) 123 456 7890
                            </p>
                        </div>
                    </div>

                    <div class="flex items-start">
                        <MailOutlined class="text-[#962D33] text-xl mt-1 mr-4" />
                        <div>
                            <h4 class="font-bold mb-1">Email</h4>
                            <p class="text-[#1D1D1B]/70">
                                info@dgpac.com
                            </p>
                        </div>
                    </div>

                    <div class="flex items-start">
                        <ClockCircleOutlined class="text-[#962D33] text-xl mt-1 mr-4" />
                        <div>
                            <h4 class="font-bold mb-1">Business Hours</h4>
                            <p class="text-[#1D1D1B]/70">
                                Monday - Friday: 9:00 AM - 5:00 PM<br />
                                Saturday & Sunday: Closed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </Col>
        </Row>
    </BaseSection>
</template>

<script setup lang="ts">
import TeamSection from '@/components/team/TeamSection.vue';
import type { TeamMember } from '@/types';
import {
    ClockCircleOutlined,
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined
} from '@ant-design/icons-vue';
import {
    Col,
    Form,
    FormItem,
    Input,
    message,
    Row
} from 'ant-design-vue';
import Textarea from 'ant-design-vue/es/input/TextArea';
import { reactive, ref } from 'vue';
import BaseButton from '../base/BaseButton.vue';
import BaseSection from '../base/BaseSection.vue';

interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const formState = reactive<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
});

const submitting = ref(false);

const rules = {
    name: [{ required: true, message: 'Please enter your name' }],
    email: [
        { required: true, message: 'Please enter your email' },
        { type: 'email', message: 'Please enter a valid email' }
    ],
    subject: [{ required: true, message: 'Please enter a subject' }],
    message: [{ required: true, message: 'Please enter your message' }]
};


// Mock data for team members
const team = ref<TeamMember[]>([
    {
        id: 1,
        name: 'John Smith',
        role: 'CEO & Safety Advisor',
        image: '/images/team1.webp',
        linkedin: 'https://linkedin.com'
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        role: 'Head of Training',
        image: '/images/team1.webp',
        linkedin: 'https://linkedin.com'
    },
    {
        id: 3,
        name: 'Michael Brown',
        role: 'Regulatory Expert',
        image: '/images/team1.webp',
        linkedin: 'https://linkedin.com'
    },
    {
        id: 4,
        name: 'Emily Davis',
        role: 'Risk Assessment Specialist',
        image: '/images/team1.webp',
        linkedin: 'https://linkedin.com'
    },
    {
        id: 5,
        name: 'Robert Wilson',
        role: 'Transport Safety Consultant',
        image: '/images/team1.webp',
        linkedin: 'https://linkedin.com'
    },
    {
        id: 6,
        name: 'Jennifer Lee',
        role: 'Compliance Manager',
        image: '/images/team1.webp',
        linkedin: 'https://linkedin.com'
    }
]);

const onFinish = () => {
    submitting.value = true;

    // Simulate API call
    setTimeout(() => {
        message.success('Your message has been sent successfully!');
        formState.name = '';
        formState.email = '';
        formState.subject = '';
        formState.message = '';
        submitting.value = false;
    }, 1500);
};
</script>
