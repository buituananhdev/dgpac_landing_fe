<template>
    <BaseSection id="services" title="OURS PROJECTS" subtitle="" bgColor="light">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProjectCard v-for="(project, index) in projects" :key="index" :project="project" />
        </div>
    </BaseSection>
</template>

<script lang="ts" setup>
import ProjectCard from './ProjectCard.vue'

interface Project {
    title: string
    date: string
    image: string
    description: string
    alt: string
}

const projects: Project[] = [
    {
        title: 'DGpac Singapore',
        date: 'Dec 2023',
        image: '/images/projects/project_1.jpg',
        alt: 'DGpac Singapore warehouse facility',
        description:
            "DGpac recently completed a business trip to Singapore to execute a hazardous goods transportation project. This marks a key step in expanding our regional presence and demonstrates DGpac's capability in delivering safe, reliable logistics solutions on ..."
    },
    {
        title: 'DGpac UNBOX',
        date: 'Dec 2023',
        image: '/images/projects/project_2.jpg',
        alt: 'DGpac UNBOX warehouse interior',
        description:
            'Our innovative UNBOX solution revolutionizes warehouse management through advanced automation and smart logistics. This project showcases our commitment to modernizing supply chain operations with cutting-edge technology and efficient processes ...'
    },
    {
        title: 'DGpac Singapore',
        date: 'Dec 2023',
        image: '/images/projects/project_3.jpg',
        alt: 'DGpac Singapore shipping containers',
        description:
            'Expanding our container logistics capabilities in Singapore, this project demonstrates our expertise in international shipping and freight management. Our comprehensive approach ensures seamless operations across multiple transportation modes ...'
    }
]
</script>
