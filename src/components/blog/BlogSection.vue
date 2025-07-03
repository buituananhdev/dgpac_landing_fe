<template>
    <BaseSection id="blog" title="Resources" subtitle="Latest articles and industry insights">
        <!-- Tags Cloud -->
        <div class="mb-10" data-aos="fade-up">
            <h3 class="text-xl font-bold mb-4">Popular Topics</h3>
            <div class="flex flex-wrap gap-2">
                <BlogTag v-for="tag in tags" :key="tag.id" :name="tag.name" :active="activeTagId === tag.id"
                    @click="toggleTag(tag.id)" />
            </div>
        </div>

        <!-- Articles List -->
        <div>
            <BlogArticle v-for="(article, index) in filteredArticles" :key="article.id" :title="article.title"
                :excerpt="article.excerpt" :date="article.date" :tags="article.tags" :all-tags="tags"
                :delay="`${index * 100}`" />
        </div>

        <!-- View All Button -->
        <div class="text-center mt-10" data-aos="fade-up">
            <BaseButton type="primary">
                View All Resources
            </BaseButton>
        </div>
    </BaseSection>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { BlogArticle as BlogArticleType, BlogTag as BlogTagType } from '../../types';
import BaseButton from '../base/BaseButton.vue';
import BaseSection from '../base/BaseSection.vue';
import BlogArticle from './BlogArticle.vue';
import BlogTag from './BlogTag.vue';

interface Props {
    tags: BlogTagType[];
    articles: BlogArticleType[];
}

const props = defineProps<Props>();
const activeTagId = ref<number | null>(null);

const toggleTag = (tagId: number) => {
    activeTagId.value = activeTagId.value === tagId ? null : tagId;
};

const filteredArticles = computed(() => {
    if (activeTagId.value === null) return props.articles;
    return props.articles.filter(article => article.tags.includes(activeTagId.value as number));
});
</script>
