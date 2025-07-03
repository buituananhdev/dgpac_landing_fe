<template>
    <div class="border-b border-[#E4E4E4] py-6 transition-all hover:bg-[#E4E4E4]/20" :data-aos="animation"
        :data-aos-delay="delay">
        <Row :gutter="[16, 16]">
            <Col :xs="24" :md="18">
            <div>
                <h3 class="text-xl font-bold mb-2 text-[#1D1D1B]">
                    <a href="#" class="hover:text-[#962D33] transition-colors">{{ title }}</a>
                </h3>
                <p class="text-[#1D1D1B]/70 mb-3">{{ excerpt }}</p>
                <div class="flex flex-wrap gap-2">
                    <BlogTag v-for="tagId in tags" :key="tagId" :name="getTagName(tagId)" />
                </div>
            </div>
            </Col>
            <Col :xs="24" :md="6" class="flex items-center justify-end">
            <div class="text-right">
                <p class="text-sm text-[#1D1D1B]/50">{{ date }}</p>
                <Button type="link" class="p-0 text-[#962D33] hover:text-[#B74E4C]">
                    Read More
                    <RightOutlined />
                </Button>
            </div>
            </Col>
        </Row>
    </div>
</template>

<script setup lang="ts">
import { RightOutlined } from '@ant-design/icons-vue';
import { Button, Col, Row } from 'ant-design-vue';
import type { BlogTag as BlogTagType } from '../../types';
import BlogTag from './BlogTag.vue';

interface Props {
    title: string;
    excerpt: string;
    date: string;
    tags: number[];
    allTags: BlogTagType[];
    animation?: string;
    delay?: string;
}

// withDefaults(defineProps<Props>(), {
//     animation: 'fade-up',
//     delay: '0'
// });

const props = defineProps<Props>();

const getTagName = (tagId: number): string => {
    const tag = props.allTags.find(t => t.id === tagId);
    return tag ? tag.name : '';
};
</script>
